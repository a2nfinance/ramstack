module ramstack::monte_carlo {
    use std::vector;
    use aptos_std::fixed_point64::{Self, FixedPoint64};
    use aptos_std::math_fixed64;
    use aptos_std::math128;
    use ramstack::fixed_point64_with_sign::{Self, FixedPoint64WithSign};

    // #[test_only]
    use std::debug;

    // s0, r, sigma, t: need to move 64 bit to left ( << 64) from the client side
    // nsteps, nrep: keep original values in u128.
    public fun mc_assets(s0: u128, r: u128, sigma: u128, t: u128, nsteps: u64, nrep: u64): vector<vector<u128>> {
       
        // init two dimension vector or a table
        // init first column with s0
        let spath = init_2d_vector(nsteps, nrep, s0);
        let dt: FixedPoint64 = math_fixed64::mul_div(
            fixed_point64::create_from_raw_value(t),
            fixed_point64::create_from_raw_value((nsteps as u128)),
            fixed_point64::create_from_raw_value(1),
        );


        let second_param = math_fixed64::mul_div(
                    fixed_point64::create_from_rational(1,2),
                    math_fixed64::pow(
                        fixed_point64::create_from_raw_value(sigma),
                        2
                    ),
                    fixed_point64::create_from_raw_value(1 << 64),
                );
        let sign_result = fixed_point64_with_sign::create_from_raw_value(
            0,
            false
        );

        if (r > fixed_point64::get_raw_value(second_param)) {

            let fixed_point64_sub_result: FixedPoint64 = fixed_point64::sub(
                    fixed_point64::create_from_raw_value(r),
                    math_fixed64::mul_div(
                        fixed_point64::create_from_rational(1,2),
                        math_fixed64::pow(
                            fixed_point64::create_from_raw_value(sigma),
                            2
                        ),
                        fixed_point64::create_from_raw_value(1 << 64),
                    )
            );

            sign_result = fixed_point64_with_sign::create_from_raw_value(
                fixed_point64::get_raw_value(fixed_point64_sub_result),
                true
            );
        } else {
            let fixed_point64_sub_result: FixedPoint64 = fixed_point64::sub(
                    math_fixed64::mul_div(
                        fixed_point64::create_from_rational(1,2),
                        math_fixed64::pow(
                            fixed_point64::create_from_raw_value(sigma),
                            2
                        ),
                        fixed_point64::create_from_raw_value(1 << 64),
                    ),
                    fixed_point64::create_from_raw_value(r),
                   
            );

            sign_result = fixed_point64_with_sign::create_from_raw_value(
                fixed_point64::get_raw_value(fixed_point64_sub_result),
                false
            );
        };


        let nudt: FixedPoint64 = math_fixed64::mul_div(
            fixed_point64::create_from_raw_value(
                fixed_point64_with_sign::get_raw_value(sign_result)
            ),
            dt,
            fixed_point64::create_from_raw_value(1 << 64)
        );

        let sign_nudt = fixed_point64_with_sign::create_from_raw_value(
                0,
                false
        );

        if (fixed_point64_with_sign::is_positive(sign_result)) {
            sign_nudt = fixed_point64_with_sign::create_from_raw_value(
                fixed_point64::get_raw_value(nudt),
                true
            );
        } else {
             sign_nudt = fixed_point64_with_sign::create_from_raw_value(
                fixed_point64::get_raw_value(nudt),
                false
            );
        };
        

        let sidt: FixedPoint64 = math_fixed64::mul_div(
            fixed_point64::create_from_raw_value(sigma),
            math_fixed64::sqrt(dt),
            fixed_point64::create_from_raw_value(1 << 64)
        );

        // Randomness here -- need to generate nsteps * nrep times.

        // convert to normal distribution

        // calculate spath

        let i = 0;

        while(i < nrep) {
            let j = 0;
            let row_i = vector::borrow_mut(&mut spath, i);
            while( j < nsteps) {
                let col_j = vector::borrow(row_i, j);
                let col_j_plus_1_fixed_point64 = math_fixed64::mul_div(
                    fixed_point64::create_from_raw_value(*col_j),
                    calculate_exp(sign_nudt, sidt, fixed_point64_with_sign::create_from_raw_value((1 << 64) / 100, false)),
                    fixed_point64::create_from_raw_value(1 << 64)
                );
                *vector::borrow_mut(row_i, j + 1) = fixed_point64::get_raw_value(col_j_plus_1_fixed_point64);
                j = j + 1;
            };
            i = i + 1;
        };

        spath

    }

    fun calculate_exp(sign_nudt: FixedPoint64WithSign, sidt: FixedPoint64, random_number: FixedPoint64WithSign): FixedPoint64  {
        

        let sign_mul_result = fixed_point64_with_sign::create_from_raw_value(
            0,
            false
        );

        let mul_result = math_fixed64::mul_div(
                sidt,
                fixed_point64::create_from_raw_value(
                    fixed_point64_with_sign::get_raw_value(random_number)
                ), // random number in FixedPoint64WithSign here
                fixed_point64::create_from_raw_value(1 << 64)
        );

        if (fixed_point64_with_sign::is_positive(random_number)) {
            
            sign_mul_result = fixed_point64_with_sign::create_from_raw_value(
                fixed_point64::get_raw_value(mul_result),
                true
            );
        } else {
            sign_mul_result = fixed_point64_with_sign::create_from_raw_value(
                fixed_point64::get_raw_value(mul_result),
                false
            );
        };

        let sign_add_result = fixed_point64_with_sign::create_from_raw_value(
            0,
            false
        );

        let sign_add_result = fixed_point64_with_sign::add(
            sign_nudt,
            sign_mul_result
        );
        let exp = math_fixed64::exp(
                fixed_point64::create_from_raw_value(
                    fixed_point64_with_sign::get_raw_value(sign_add_result)
                )
        );

        if (!fixed_point64_with_sign::is_positive(sign_add_result)) {
            exp = math_fixed64::mul_div(
                fixed_point64::create_from_raw_value(1<<64), 
                fixed_point64::create_from_raw_value(1<<64),
                exp
            )
        };

        exp
    }

    fun init_2d_vector(step: u64, rep: u64, first_column_value: u128): vector<vector<u128>> {
        let spath = vector::empty<vector<u128>>();
        let i = 0;
        while (i < rep) {

            let row = vector::empty<u128>();
            let j = 0;
            while (j < step + 1) {
                if (j == 0) {
                    vector::push_back(&mut row, first_column_value);
                } else {
                    vector::push_back(&mut row, 0);
                };
                
                j = j + 1;
            };

            vector::push_back(&mut spath, row);
            i = i +1;
        };

        spath

    }


    #[test]
    public fun test_init_2d_vector() {
        let spath = init_2d_vector(10, 15, 1);

        debug::print(&spath);
    }

    #[test]
    public fun test_mc_assets() {
        // S0 = 100
        // K = 110
        // CallOrPut = 'call'
        // r = 0.03
        // sigma = 0.25
        // T = 0.5
        // Nsteps = 10000
        // Nrep = 1000
        // SPATH = mc_asset(S0, r, sigma, T, Nsteps, Nrep)

        let s0 = 100 << 64;
        let r = 553402322211286548;
        let sigma = 4611686018427387904;
        let t = 9223372036854775808;
        let nsteps = 10;
        let nrep = 5;
        let spath = mc_assets(s0, r, sigma, t, nsteps, nrep);
        debug::print(&spath);
    }
}
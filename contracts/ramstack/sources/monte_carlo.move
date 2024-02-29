module ramstack::monte_carlo {
    use std::vector;
    use aptos_std::fixed_point64::{Self, FixedPoint64};
    use aptos_std::math_fixed64;
    use ramstack::fixed_point64_with_sign::{Self, FixedPoint64WithSign};
    use ramstack::box_muller;
    use aptos_framework::randomness;

    // s0, r, sigma, t: need to move 64 bit to left ( << 64) from the client side
    // nsteps, nrep: keep original values in u128.
    fun generate_spath(s0: u128, r: u128, sigma: u128, t: u128, nsteps: u64, nrep: u64, random_numbers: vector<FixedPoint64WithSign>): vector<vector<u128>> {
       
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

        let sign_result: FixedPoint64WithSign;

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

        let sign_nudt: FixedPoint64WithSign;

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

        let i = 0;

        while(i < nrep) {
            let j = 0;
            let row_i = vector::borrow_mut(&mut spath, i);
            while( j < nsteps) {
                let col_j = vector::borrow(row_i, j);
                let col_j_plus_1_fixed_point64 = math_fixed64::mul_div(
                    fixed_point64::create_from_raw_value(*col_j),
                    calculate_exp(sign_nudt, sidt, *vector::borrow(&random_numbers, (i+1)*(j+1) - 1)),
                    fixed_point64::create_from_raw_value(1 << 64)
                );
                *vector::borrow_mut(row_i, j + 1) = fixed_point64::get_raw_value(col_j_plus_1_fixed_point64);
                j = j + 1;
            };
            i = i + 1;
        };

        spath

    }

    public fun generate_spath_with_permution(s0: u128, r: u128, sigma: u128, t: u128, nsteps: u64, nrep: u64):vector<vector<u128>> {
            let random_numbers: vector<FixedPoint64WithSign> = generate_random_using_permutation(nrep, nsteps);
            generate_spath(s0, r, sigma, t, nsteps, nrep, random_numbers)
    }


    public fun generate_spath_with_range(s0: u128, r: u128, sigma: u128, t: u128, nsteps: u64, nrep: u64, max_excl: u64):vector<vector<u128>> {
            let random_numbers: vector<FixedPoint64WithSign> = generate_random_using_u64_range(nrep, nsteps, max_excl);
            generate_spath(s0, r, sigma, t, nsteps, nrep, random_numbers)
    }

    fun calculate_exp(sign_nudt: FixedPoint64WithSign, sidt: FixedPoint64, random_number: FixedPoint64WithSign): FixedPoint64  {
        

        let sign_mul_result: FixedPoint64WithSign;

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

    fun generate_random_using_permutation(nrep: u64, nsteps: u64): vector<FixedPoint64WithSign> {
        let range = nrep * nsteps + 1;
        let uniform_random_numbers = randomness::permutation(range);
        let (_, index_of_zero) = vector::index_of<u64>(&uniform_random_numbers, &(0));
        vector::remove(&mut uniform_random_numbers, index_of_zero);
        let random_numbers = box_muller::uniform_to_normal(uniform_random_numbers, (range as u128));
        // let i = 0;
        // let length = vector::length(&random_numbers);
        // // Normalize to [0,1]
        // while(i < length) {
        //     let current_value = *vector::borrow(&random_numbers, i);
        //     *vector::borrow_mut(&mut random_numbers, i) = fixed_point64_with_sign::div_u128(current_value, (range as u128));
        //     i = i + 1;
        // };

        random_numbers
    }

    fun generate_random_using_u64_range(nrep: u64, nsteps: u64, max_excl: u64): vector<FixedPoint64WithSign> {
        let size = nrep * nsteps;
        let i = 0;
        let uniform_random_numbers = vector::empty<u64>();
        while( i < size) {
            let number = randomness::u64_range(1, max_excl);
            vector::push_back(&mut uniform_random_numbers, number);
            i = i + 1;
        };

        let random_numbers = box_muller::uniform_to_normal(uniform_random_numbers, (max_excl as u128));
        random_numbers
    }
}
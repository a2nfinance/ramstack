module ramstack::cos_sin {
    use aptos_std::fixed_point64::{Self, FixedPoint64};
    use aptos_std::math_fixed64;
    use aptos_std::math128;
    use ramstack::pi;
    use ramstack::fixed_point64_with_sign::{Self, FixedPoint64WithSign};
    use ramstack::math_fixed64_with_sign;

    const EEXCEED_2PI: u64 = 0;
    const EZERO_COSX: u64 = 1;

    // use Maclaurin series: 
    // Cos(x) = Sum( (-1**n / (2n)!) * x**2n )
    // n is number of replicate to approximate Cos(x)
    // x: a variable in radians.
    fun maclaurin_approx_cosx(x: FixedPoint64, rep: u64): FixedPoint64 {
        let i = 1;
        let return_value: FixedPoint64 = fixed_point64::create_from_raw_value(1 << 64);

        // This process can be improved using fixed_point64_with_sign and math_fixed64_with_sign.
        while( i < rep) {
            if (i % 2 == 0) {
                let add_number: FixedPoint64 = math_fixed64::mul_div(
                        fixed_point64::create_from_raw_value(1),
                        math_fixed64::pow(x, 2*i),
                        fixed_point64::create_from_raw_value(factorial(2*i))
                ); 
                return_value = fixed_point64::add(
                   
                    return_value,
                    add_number
                );
            };
            i = i + 1;
        };

        // This process can be improved using fixed_point64_with_sign and math_fixed64_with_sign.
        let j = 1;
        while( j < rep) {
            if (j % 2 != 0) {

                let add_number: FixedPoint64 = math_fixed64::mul_div(
                        fixed_point64::create_from_raw_value(1),
                        math_fixed64::pow(x, 2*j),
                        fixed_point64::create_from_raw_value(factorial(2*j))
                ); 
                return_value = fixed_point64::sub(
                    return_value,
                    add_number
                );
            };
            j = j + 1;
        };
        return_value
    }

    // x belongs to (0, 2*PI)
    public fun cosx(x: u128, rep: u64): FixedPoint64WithSign {
        let pi_value = pi::get_pi_const();
        assert!(x <= 2 * pi_value, EEXCEED_2PI);

        if ( x == pi_value/2 || x == 3 * pi_value / 2) {
            return fixed_point64_with_sign::create_from_raw_value(
                0,
                false
            )
        };
        if ( 2 * x >= pi_value && x < pi_value) {
            let positive_value: FixedPoint64 = fixed_point64::create_from_raw_value(pi_value - x);
            return fixed_point64_with_sign::create_from_raw_value(
                fixed_point64::get_raw_value(maclaurin_approx_cosx(positive_value, rep)),
                false
            )
        };
        
        if (x >= pi_value && 2 * x < 3 * pi_value) {

            let positive_value: FixedPoint64 = fixed_point64::create_from_raw_value(x - pi_value);
            return fixed_point64_with_sign::create_from_raw_value(
                fixed_point64::get_raw_value(maclaurin_approx_cosx(positive_value, rep)),
                false
            )

        };

        if (2 * x >= 3 * pi_value && x < pi_value) {
            let positive_value: FixedPoint64 = fixed_point64::create_from_raw_value(2 * pi_value - x);

            return fixed_point64_with_sign::create_from_raw_value(
                fixed_point64::get_raw_value(maclaurin_approx_cosx(positive_value, rep)),
                true
            )
            
        };

        return fixed_point64_with_sign::create_from_raw_value(
                fixed_point64::get_raw_value(maclaurin_approx_cosx(fixed_point64::create_from_raw_value(x), rep)),
                true
        )
        
    }


    // Calculate n!
    fun factorial(n: u64): u128 {
        let i = 0;
        let return_value = 1;
        while(i < n) {
            return_value = return_value * (i + 1);
            i = i + 1;
        };

        (return_value as u128)

    }

    // Sin(x) = Cos(PI/2 - x)
    public fun sinx(x: u128, rep: u64): FixedPoint64WithSign {
         let pi_value = pi::get_pi_const();
         assert!(x <= 2 * pi_value, EEXCEED_2PI);
         if (x == 0 || x == pi_value || x == 2 * pi_value) {
            return fixed_point64_with_sign::create_from_raw_value(
                0,
                false
            )
         };

         if (pi_value >= 2 * x) {
            return cosx(pi_value/2 - x, rep)
         };
    
        cosx(x - pi_value/2, rep)
         
    }

    // Degree to radian
    public fun deg_to_rad(deg: u128): u128 {
        let pi_value = pi::get_pi_const();
        let radians = math128::mul_div(pi_value, deg, 180);
        radians
    }

    // Cos(x) where x is in degree
    public fun cosx_by_degree(deg: u128, rep: u64): FixedPoint64WithSign {
        assert!(deg <= 360, EEXCEED_2PI);
        let rads = deg_to_rad(deg);
        cosx(rads, rep)
    }
    // Sin(x) where x is in degree
    public fun sinx_by_degree(deg: u128, rep: u64): FixedPoint64WithSign {
        assert!(deg <= 360, EEXCEED_2PI);
        let rads = deg_to_rad(deg);
        sinx(rads, rep)
    }

    // Tan = sin/cos
    public fun tanx(x: u128, rep: u64): FixedPoint64WithSign {
        let sin: FixedPoint64WithSign = sinx(x, rep);
        let cos: FixedPoint64WithSign = cosx(x, rep);
        math_fixed64_with_sign::div(sin, cos)
    }

    // Tan = sin/cos
    public fun tanx_by_degree(deg: u128, rep: u64): FixedPoint64WithSign {
        assert!(deg <= 360, EEXCEED_2PI);
        let rads = deg_to_rad(deg);
        tanx(rads, rep)
    }
}
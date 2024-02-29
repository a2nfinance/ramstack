module ramstack::math_fixed64_with_sign {

    use ramstack::fixed_point64_with_sign::{Self, FixedPoint64WithSign};
    use aptos_std::math_fixed64;
    use aptos_std::fixed_point64::{Self, FixedPoint64};

    const EZERO_DENOMINATOR: u64 = 0;
    const ENEGATIVE: u64 = 1;
    const LN2: u128 = 12786308645202655660;

    public fun div_u128(x: FixedPoint64WithSign, denominator: u128): FixedPoint64WithSign {
        let result = math_fixed64::mul_div(
            fixed_point64::create_from_raw_value(fixed_point64_with_sign::get_raw_value(x)),
            fixed_point64::create_from_raw_value(1 << 64),
            fixed_point64::create_from_raw_value(denominator << 64)
        );
        fixed_point64_with_sign::create_from_raw_value(
            fixed_point64::get_raw_value(result),
            fixed_point64_with_sign::is_positive(x)
        )
    }



    public fun mul(x: FixedPoint64WithSign, y: FixedPoint64WithSign): FixedPoint64WithSign {
        let positive_x = fixed_point64_with_sign::is_positive(x);
        let positive_y = fixed_point64_with_sign::is_positive(y);
        let fixed_point64_without_sign = math_fixed64::mul_div(
            fixed_point64_with_sign::remove_sign(x),
            fixed_point64_with_sign::remove_sign(y),
            fixed_point64::create_from_raw_value(1<<64)
        );
        let is_positive = (positive_x == positive_y);
        
        fixed_point64_with_sign::create_from_raw_value(
            fixed_point64::get_raw_value(fixed_point64_without_sign),
            is_positive
        )
    }

    public fun div(x: FixedPoint64WithSign, y: FixedPoint64WithSign): FixedPoint64WithSign {
        assert!(fixed_point64_with_sign::get_raw_value(y) != 0, EZERO_DENOMINATOR);

        let positive_x = fixed_point64_with_sign::is_positive(x);
        let positive_y = fixed_point64_with_sign::is_positive(y);
        let fixed_point64_without_sign = math_fixed64::mul_div(
            fixed_point64_with_sign::remove_sign(x),
            fixed_point64::create_from_raw_value(1<<64),
            fixed_point64_with_sign::remove_sign(y)
        );
        let is_positive = (positive_x == positive_y);
        
        fixed_point64_with_sign::create_from_raw_value(
            fixed_point64::get_raw_value(fixed_point64_without_sign),
            is_positive
        )
    }

    public fun pow(x: FixedPoint64WithSign, y: u64): FixedPoint64WithSign {
        let fixed_point64_number = math_fixed64::pow(
            fixed_point64::create_from_raw_value(
                fixed_point64_with_sign::get_raw_value(x)
            ),
            y
        );
        fixed_point64_with_sign::create_from_raw_value(
            fixed_point64::get_raw_value(fixed_point64_number),
            true
        )
    }
    
    public fun sqrt(x: FixedPoint64WithSign): FixedPoint64WithSign {
        assert!(fixed_point64_with_sign::is_positive(x), ENEGATIVE);
        
        let fixed_point64_number = math_fixed64::sqrt(
             fixed_point64::create_from_raw_value(
                fixed_point64_with_sign::get_raw_value(x)
            ),
        );

        fixed_point64_with_sign::create_from_raw_value(
            fixed_point64::get_raw_value(fixed_point64_number),
            true
        )
    }

    public fun ln(x: FixedPoint64WithSign): FixedPoint64WithSign{
        assert!(fixed_point64_with_sign::is_positive(x), ENEGATIVE);
        let ln_plus_32ln2: FixedPoint64 = math_fixed64::ln_plus_32ln2(
            fixed_point64_with_sign::remove_sign(x)
        );

        let ln_with_sign: FixedPoint64WithSign = fixed_point64_with_sign::sub(
            fixed_point64_with_sign::create_from_raw_value(
                fixed_point64::get_raw_value(ln_plus_32ln2),
                true
            ),
            fixed_point64_with_sign::create_from_raw_value(
                64 * LN2,
                true
            )
                
            
        );

        ln_with_sign
        
    }
}
module ramstack::math_fixed64_with_sign {

    use ramstack::fixed_point64_with_sign::{Self, FixedPoint64WithSign};
    use aptos_std::math_fixed64;
    use aptos_std::fixed_point64::{Self, FixedPoint64};
    use std::vector;

    const EZERO_DENOMINATOR: u64 = 0;
    const ENEGATIVE: u64 = 1;
    const EZEROLENGTH: u64 = 2;
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

    // Maximum
    public fun maximum(numbers: vector<FixedPoint64WithSign>): FixedPoint64WithSign {
        // assert length here
        assert!(vector::length(&numbers) > 0, EZEROLENGTH);
        let maximum: &FixedPoint64WithSign = vector::borrow(&numbers, 0);
        let i = 0;
        while(i < vector::length(&numbers)) {
            let number = vector::borrow(&numbers, i);
            let sub_number = fixed_point64_with_sign::sub(*number, *maximum);
            if (fixed_point64_with_sign::is_positive(sub_number)) {
                maximum = number;
            };
            i = i + 1;
        };

        *maximum
    }

    // Minimum
    public fun minimum(numbers: vector<FixedPoint64WithSign>): FixedPoint64WithSign {
        // assert length here
        assert!(vector::length(&numbers) > 0, EZEROLENGTH);
        let minimum: &FixedPoint64WithSign = vector::borrow(&numbers, 0);
        let i = 0;
        while(i < vector::length(&numbers)) {
            let number = vector::borrow(&numbers, i);
            let sub_number = fixed_point64_with_sign::sub(*minimum, *number);
            if (fixed_point64_with_sign::is_positive(sub_number)) {
                minimum = number;
            };
            i = i + 1;
        };

        *minimum
    }
    // Log2
    public fun log2(number: FixedPoint64WithSign): FixedPoint64WithSign {
        assert!(fixed_point64_with_sign::is_positive(number), ENEGATIVE);
        let log2_plus_64: FixedPoint64 = math_fixed64::log2_plus_64(
            fixed_point64_with_sign::remove_sign(number)
        );

        let log2_with_sign: FixedPoint64WithSign = fixed_point64_with_sign::sub(
            fixed_point64_with_sign::create_from_raw_value(
                fixed_point64::get_raw_value(log2_plus_64),
                true
            ),
            fixed_point64_with_sign::create_from_raw_value(
                64 << 64,
                true
            )
                
            
        );

        log2_with_sign
    } 
    // Mean
    public fun mean(numbers: vector<FixedPoint64WithSign>): FixedPoint64WithSign {
        // assert length here
        assert!(vector::length(&numbers) > 0, EZEROLENGTH);
        let vector_length = vector::length(&numbers);
        let sum = fixed_point64_with_sign::create_from_raw_value(
            0,
            false
        );
        let i = 0;
        while(i < vector_length) {
            let number = vector::borrow(&numbers, i);
            sum = fixed_point64_with_sign::add(sum, *number);
            i = i + 1;
        };


        div(
            sum, 
            fixed_point64_with_sign::create_from_raw_value(
                (vector_length as u128) << 64,
                true
            )
        )
    }
    // Exp
    public fun exp(number: FixedPoint64WithSign): FixedPoint64WithSign {
        let exp_number = math_fixed64::exp(
            fixed_point64::create_from_raw_value(
                fixed_point64_with_sign::get_raw_value(number)
            )
        );
        let exp_result = fixed_point64_with_sign::create_from_raw_value(fixed_point64::get_raw_value(exp_number), true);
        if (!fixed_point64_with_sign::is_positive(number)) {
            exp_result = div(
                fixed_point64_with_sign::create_from_raw_value(1<<64, true),
                exp_result
            );
        };

        exp_result
    }
    
    // Sum
    public fun sum(numbers: vector<FixedPoint64WithSign>): FixedPoint64WithSign {
        let sum_result = fixed_point64_with_sign::create_from_raw_value(0, false);
        let i = 0;
        while(i < vector::length(&numbers)) {
            let number = vector::borrow(&numbers, i);
            sum_result = fixed_point64_with_sign::add(sum_result, *number);
            i = i + 1;
        };

        sum_result
    }

    //  Std: standard deviation
    // std = sqrt( sum(arr[i] - mean)**2 /n )
    public fun std(numbers: vector<FixedPoint64WithSign>): FixedPoint64WithSign {
        let sum_result = fixed_point64_with_sign::create_from_raw_value(0, false);
        let mean = mean(numbers);
        let i = 0;
        while(i < vector::length(&numbers)) {
            let number = vector::borrow(&numbers, i);
            let number_sub_mean = fixed_point64_with_sign::sub(*number, mean);
            let pow_sub = pow(number_sub_mean, 2);
            sum_result = fixed_point64_with_sign::add(sum_result, pow_sub);
            i = i + 1;
        };

        let variace = div_u128(sum_result, (vector::length(&numbers) as u128));
        
        sqrt(variace) 
    }

}
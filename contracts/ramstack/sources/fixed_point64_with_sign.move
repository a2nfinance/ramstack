module ramstack::fixed_point64_with_sign {

    const ERATIO_OUT_OF_RANGE: u64 = 131077;
    const MAX_U128: u256 = 340282366920938463463374607431768211455;

    use aptos_std::math_fixed64;
    use aptos_std::fixed_point64;

    struct FixedPoint64WithSign has copy, drop {
        value: u128,
        positive: bool,
    }


    public fun get_raw_value(x: FixedPoint64WithSign): u128 {
        x.value
    }

    public fun is_positive(x: FixedPoint64WithSign): bool {
        x.positive
    }

    public fun create_from_raw_value(value: u128, positive: bool): FixedPoint64WithSign {
        FixedPoint64WithSign {
            value,
            positive
        }
    }

    public fun greater_or_equal_without_sign(num1: FixedPoint64WithSign, num2: FixedPoint64WithSign): bool {
        num1.value >= num2.value
    }


    public fun add(x: FixedPoint64WithSign, y: FixedPoint64WithSign): FixedPoint64WithSign {
        let x_raw = get_raw_value(x);
        let y_raw = get_raw_value(y);
        let is_positive_x = is_positive(x);
        let is_positive_y = is_positive(y);

        let result = 0;
        let sign = false;
        if (is_positive_x && is_positive_x) {
            result = (x_raw as u256) + (y_raw as u256);
            sign = true;
        } else {
          if (is_positive_x && !is_positive_y) {
             if (x_raw > y_raw) {
                result = (x_raw as u256) - (y_raw as u256);
                sign = true;
             } else {
                result = (y_raw as u256) - (x_raw as u256);
                sign = false;
             };
          };

          if (!is_positive_x && is_positive_y) {
             if (y_raw > x_raw) {
                result = (y_raw as u256) - (x_raw as u256);
                sign = true;
             } else {
                result = (x_raw as u256) - (y_raw as u256);
                sign = false;
             };
          };

          if (!is_positive_x && !is_positive_y) {
            result = (y_raw as u256) + (x_raw as u256);
            sign = false;    
          }

        };
        
        assert!(result <= MAX_U128, ERATIO_OUT_OF_RANGE);
        create_from_raw_value((result as u128), sign)
    }

    public fun div_u128(x: FixedPoint64WithSign, denominator: u128): FixedPoint64WithSign {
        let result = math_fixed64::mul_div(
            fixed_point64::create_from_raw_value(get_raw_value(x)),
            fixed_point64::create_from_raw_value(1 << 64),
            fixed_point64::create_from_raw_value(denominator << 64)
        );
        FixedPoint64WithSign {
            value: fixed_point64::get_raw_value(result),
            positive: is_positive(x)
        }
    }

}
module ramstack::fixed_point64_with_sign {

    const ERATIO_OUT_OF_RANGE: u64 = 131077;
    const MAX_U128: u256 = 340282366920938463463374607431768211455;
    use aptos_std::fixed_point64::{Self, FixedPoint64};

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

    public fun create_from_rational(number: u128, denominator: u128, positive: bool): FixedPoint64WithSign {
        let fixed_point_number = fixed_point64::create_from_rational(number, denominator);
        FixedPoint64WithSign {
            value: fixed_point64::get_raw_value(fixed_point_number),
            positive: positive
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
        if (is_positive_x && is_positive_y) {
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

    public fun sub(x: FixedPoint64WithSign, y: FixedPoint64WithSign): FixedPoint64WithSign {
        let revert_sign_y = revert_sign(y);
        add(x, revert_sign_y)
    }

    public fun abs(x: FixedPoint64WithSign): FixedPoint64WithSign {
        FixedPoint64WithSign {
            value: get_raw_value(x),
            positive: true
        }
    }

    public fun abs_u128(x: FixedPoint64WithSign): u128 {
        get_raw_value(x)
    }

    public fun remove_sign(x: FixedPoint64WithSign): FixedPoint64 {
        fixed_point64::create_from_raw_value(
            get_raw_value(x)
        )
    }

    // x = -1 * x
    public fun revert_sign(x: FixedPoint64WithSign): FixedPoint64WithSign {
        FixedPoint64WithSign {
            value: get_raw_value(x),
            positive: !(x.positive)
        }
    }

    public fun is_equal(x: FixedPoint64WithSign, y: FixedPoint64WithSign): bool {
        if (x.value == y.value && x.positive == y.positive) {
            return true
        };
        false
    }
}
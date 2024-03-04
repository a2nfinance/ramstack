module ramstack::pi {
    use aptos_std::fixed_point64::{Self, FixedPoint64};
    use aptos_std::math128;

    // Default value is a result of BBP formula with number of reps is 10.
    // The real value of PI is PI/2^64.
    const PI: u128 = 57952155664616944161;

    // Use Leibniz series:
    // PI = 4 * sum( sgn(-1**n) / (2*n +1) )
    // Easy to calculate but not accurate unless number of reps is very great.
    public fun leibniz_approx_pi(rep: u128): FixedPoint64 {
        let i = 1;
        let return_value: FixedPoint64 = fixed_point64::create_from_raw_value(1 << 64);
        while(i < rep) {
            if (i % 2 == 0) {
                return_value = fixed_point64::add(return_value, fixed_point64::create_from_rational(1, 2 * i + 1))
            } else {
                return_value = fixed_point64::sub(return_value, fixed_point64::create_from_rational(1, 2 * i + 1))
            };
           
            i = i +1;
        };
        
        multiply(return_value, 4)
    }

    // Bailey_Borwein_Plouffe formula:
    // PI = sum( (1/16**k) * sum( 4 / (8k + 1) - 2 / (8k + 4) - 1 / (8k + 5) - 1 / (8k + 6) ) )
    // k is number of replicate to approximate PI
    // This is a complex formula but it's very accurate and faster than Leibniz.
    public fun bbp_approx_pi(rep: u128): FixedPoint64 {
        let i = 1;
        let return_value: FixedPoint64 = fixed_point64::sub(
            fixed_point64::create_from_raw_value(4 << 64), 
            fixed_point64::create_from_rational(13,15)
        );
        while(i < rep) {
            let pow_16 = math128::pow(16, i);
            return_value = fixed_point64::add(
                return_value,
                fixed_point64::create_from_rational(
                    4,
                    pow_16 * (8 * i + 1)
                )
            );

            return_value = fixed_point64::sub(
                return_value,
                fixed_point64::create_from_rational(
                    2,
                    pow_16 * (8 * i + 4)
                )
            );
            return_value = fixed_point64::sub(
                return_value,
                fixed_point64::create_from_rational(
                    1,
                    pow_16 * (8 * i + 5)
                )
            );

            return_value = fixed_point64::sub(
                return_value,
                fixed_point64::create_from_rational(
                    1,
                    pow_16 * (8 * i + 6)
                )
            );

            i = i + 1;
        };

        return_value
    }

    fun multiply(x: FixedPoint64, number: u128): FixedPoint64 {
        let j = 1;
        let return_value: FixedPoint64 = x;
        while (j < number) {
            return_value = fixed_point64::add(return_value, x);
            j = j + 1;
        };

        return_value
    }

    public fun get_pi_const(): u128 {
        PI
    }

}
// CDF of exponential distribution:
// F(x) = 1 - e**(-lambda * x)
// Invert the CDF:
// x = -(1/lambda) * ln(1 - F(x))
// F(x) is a ramdom number in (0,1).
module ramstack::exponential_transform {
    use aptos_std::math_fixed64;
    use aptos_std::fixed_point64::{Self, FixedPoint64};
    const LN2: u128 = 12786308645202655660;
    const EGREATER_THAN_RANGE: u64 = 0;

    // number: a random number following the uniform distribution
    // lambda: the rate parameter of the exponential distribution.
    public fun uniform_to_exponential(random_number: u128, range: u128, lambda: FixedPoint64): FixedPoint64 {
        assert!(random_number < range, EGREATER_THAN_RANGE);

        // Standalize the random number to belong (0,1)
        let normalized_number = fixed_point64::create_from_rational(random_number, range);

        // ln(1 - F(x))
        let ln_plus_32ln2 = math_fixed64::ln_plus_32ln2(
            fixed_point64::sub(
                fixed_point64::create_from_raw_value(1 << 64),
                normalized_number
            )
        );

        // -1 * ln(1-F(x)) is alway positive because F(x) belongs to (0,1).
        // ln(a << 64) << 64 = ln(a) << 64 + 64*LN2
        // ln(a) << 64 = ln_plus_32ln2 - 64*LN2
        // -1 * (ln_plus_32ln2 - 64*LN2) = 64*LN2 - ln_plus_32ln2;
        let corrected_number = math_fixed64::mul_div(
            fixed_point64::create_from_raw_value(1 << 64),
            fixed_point64::sub(
                fixed_point64::create_from_raw_value(64*LN2),
                ln_plus_32ln2
            ),
           lambda
        );

        corrected_number
    }
}
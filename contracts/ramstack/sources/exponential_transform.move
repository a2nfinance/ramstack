module ramstack::exponential_tranform {
    use aptos_std::math_fixed64;
    use aptos_std::fixed_point64::{Self, FixedPoint64};
    const LN2: u128 = 12786308645202655660;
    // number: a random number following uniform distribution
    // number belongs to [0,1]
    public fun uniform_to_exponential(number: FixedPoint64, lambda: FixedPoint64): FixedPoint64 {
        // x = - (1/lambda) * ln(1-F(x))

        // ln(1 - F(x))
        let ln_plus_32ln2 = math_fixed64::ln_plus_32ln2(
            fixed_point64::sub(
                fixed_point64::create_from_raw_value(1 << 64),
                number
            )
        );

        // -1 * ln(1-F(x)) is alway positive because F(x) belongs to [0,1].
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
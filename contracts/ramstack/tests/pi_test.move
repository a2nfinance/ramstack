#[test_only]
module ramstack::pi_test {
    use ramstack::pi;
    use aptos_std::fixed_point64::{Self, FixedPoint64};
    use std::debug;
    #[test]
    public fun test_leibniz_approx_pi() {
        let pi: FixedPoint64 = pi::leibniz_approx_pi(100);
        let xpi = fixed_point64::get_raw_value(pi) >> 63;
        let round_pi = fixed_point64::round(pi);
        debug::print(&round_pi);
        debug::print(&xpi);
    }

    #[test]
    public fun test_bbp_approx_pi() {
        let pi: FixedPoint64 = pi::bbp_approx_pi(10);
        debug::print(&pi);
    }
}
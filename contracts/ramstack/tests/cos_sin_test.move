#[test_only]
module ramstack::cos_sin_test {
    use ramstack::cos_sin;
    use ramstack::pi;
    use ramstack::fixed_point64_with_sign::{FixedPoint64WithSign};
    use aptos_std::math128;
    use std::debug;

    
    #[test]
    public fun test_maclaurin_approx_cosx() {
        let pi_value = pi::get_pi_const();
        // to radians
        let radians = math128::mul_div(pi_value, 91, 180);
        let approx_cosx: FixedPoint64WithSign = cos_sin::cosx(radians, 10);
        debug::print(&approx_cosx);
    }

    #[test]
    public fun test_maclaurin_approx_sinx() {
        let pi_value = pi::get_pi_const();
        // to radians
        let radians = math128::mul_div(pi_value, 45, 180);
        let approx_sinx: FixedPoint64WithSign = cos_sin::sinx(radians, 10);
        debug::print(&approx_sinx);
    }
}
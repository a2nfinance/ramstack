// Laplacian CDF: F(x) = 1/2 * exp(-|x-mu|/beta)
// F(x) follows a uniform distribution
// Invert F(x) = mu - beta * sgn(p-0.5) * ln(1 - 2*|p-0.5|); 
module ramstack::laplacian_transform {
    use aptos_std::fixed_point64::{Self, FixedPoint64};
    use ramstack::fixed_point64_with_sign::{Self, FixedPoint64WithSign};
    use ramstack::math_fixed64_with_sign;
    const EGREATER_THAN_ONE: u64 = 0;
    use std::debug;
    // mu: location parameter
    // beta: scale parameter
    // p: random number in [0,1] follow uniform distribution
    // beta and mu must be converted to 64 bits left from real values.
    public fun uniform_to_laplacian(p: FixedPoint64, mu: u128, beta: u128): FixedPoint64WithSign {

        assert!(fixed_point64::get_raw_value(p) <= (1 <<64), EGREATER_THAN_ONE);

        let p_sub = fixed_point64_with_sign::sub(
            fixed_point64_with_sign::create_from_raw_value(
                fixed_point64::get_raw_value(p),
                true
            ),
            fixed_point64_with_sign::create_from_rational(1,2, true)
        );
        debug::print(&(p_sub));
        // 1 - 2* |p-0.5|
        // cause of p <=1  => 1 - 2 *|p-0.5| is always positive 
        let ln_param = fixed_point64_with_sign::sub(
            fixed_point64_with_sign::create_from_raw_value(1 << 64, true),
            math_fixed64_with_sign::mul(
                fixed_point64_with_sign::create_from_raw_value(2<<64, true),
                fixed_point64_with_sign::abs(p_sub)
            )
        );

        
        debug::print(&ln_param);
        let correct_ln_with_sign = math_fixed64_with_sign::ln(ln_param);

        let sgn_p_sub = fixed_point64_with_sign::create_from_raw_value(
            1 << 64,
            fixed_point64_with_sign::is_positive(p_sub)
        );
        debug::print(&correct_ln_with_sign);    
        debug::print(&sgn_p_sub);

        let mul_result = math_fixed64_with_sign::mul(correct_ln_with_sign, sgn_p_sub);
        mul_result = math_fixed64_with_sign::mul(
            mul_result, 
            fixed_point64_with_sign::create_from_raw_value(beta, true)
        );

        let laplacian_number = fixed_point64_with_sign::sub(
            fixed_point64_with_sign::create_from_raw_value(mu, true),
            mul_result
        );

        laplacian_number

         
    }
}

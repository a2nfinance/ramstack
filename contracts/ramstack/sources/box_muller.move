module ramstack::box_muller {
    use std::vector;
    use aptos_std::fixed_point64::{Self, FixedPoint64};
    use aptos_std::math_fixed64;
    use aptos_std::math128;
    #[test_only]
    use aptos_std::crypto_algebra::enable_cryptography_algebra_natives;
    #[test_only]
    use std::debug;
    #[test_only]
    use aptos_framework::randomness;


    use ramstack::cos_sin;
    use ramstack::fixed_point64_with_sign::{Self, FixedPoint64WithSign};
    use ramstack::pi;
    const LN2: u128 = 12786308645202655660;

    public fun uniform_to_normal(random_numbers: vector<u64>, range: u128): (vector<FixedPoint64WithSign>, vector<FixedPoint64WithSign>) {
        let (first_part, second_part) = get_two_parts(random_numbers);

  
        let len_first_part = vector::length(&first_part);

        let nomalized_first_part = vector::empty<FixedPoint64WithSign>();
        let nomalized_second_part = vector::empty<FixedPoint64WithSign>();

        let i = 0;
        while(i < len_first_part) {
            let (z0, z1) = normalize_u1_u2(*vector::borrow(&first_part, i), *vector::borrow(&second_part, i), range);
            vector::push_back(&mut nomalized_first_part, z0);
            vector::push_back(&mut nomalized_second_part, z1);
            i = i + 1;
        };

        (nomalized_first_part, nomalized_second_part)

    }

    fun normalize_u1_u2(u1: u128, u2: u128, range: u128): (FixedPoint64WithSign, FixedPoint64WithSign) {
        // nomalize u1/range, u2/range to achieve uniform distribution in [0,1]
        let pi_value = pi::get_pi_const();
        let cos_u2 =  cos_sin::cosx(
            math128::mul_div(2 * pi_value, u2, range),
            10
        );

        let sin_u2 = cos_sin::sinx(
            math128::mul_div(2 * pi_value, u2, range),
            10
        );

        let ln_u1 = math_fixed64::ln_plus_32ln2(
            fixed_point64::create_from_rational(range * range, u1 * u1)
        );
        let multiply_64ln2 = 64 * LN2;
        let sqrt_u1: FixedPoint64 = math_fixed64::sqrt(
                fixed_point64::sub(ln_u1, fixed_point64::create_from_raw_value(multiply_64ln2))
        );
        let z0: FixedPoint64 = math_fixed64::mul_div(
            sqrt_u1,
            fixed_point64::create_from_raw_value(fixed_point64_with_sign::get_raw_value(cos_u2)),
            fixed_point64::create_from_raw_value(1 << 64)
        );

        let z1: FixedPoint64 = math_fixed64::mul_div(
            sqrt_u1,
            fixed_point64::create_from_raw_value(fixed_point64_with_sign::get_raw_value(sin_u2)),
            fixed_point64::create_from_raw_value(1 << 64)
        );

        (
            fixed_point64_with_sign::create_from_raw_value(
                fixed_point64::get_raw_value(z0), 
                fixed_point64_with_sign::is_positive(cos_u2)
            ),
            fixed_point64_with_sign::create_from_raw_value(
                fixed_point64::get_raw_value(z1), 
                fixed_point64_with_sign::is_positive(sin_u2)
            )
        )
        
    }


    fun get_two_parts(random_numbers: vector<u64>): (vector<u128>, vector<u128>) {
        let n = vector::length(&random_numbers);
        let first_part = vector::empty<u128>();
        let second_part = vector::empty<u128>();

        let i = 0;

        while (i < n) {
            if (i < n / 2) {
                vector::push_back(&mut first_part, (*vector::borrow(&random_numbers, i) as u128))
            } else {
                vector::push_back(&mut second_part,(*vector::borrow(&random_numbers, i) as u128))
            };
            i = i + 1;
        };

        (first_part, second_part)
    }

    #[test(fx = @aptos_framework)]
    public fun test_nomalize_u1_u2(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let numbers = randomness::permutation(20);
        let (first_part, second_part) = uniform_to_normal(numbers, 20);
        debug::print(&first_part);
        debug::print(&second_part);
    }


}
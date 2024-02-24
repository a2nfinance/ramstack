module ramstack::box_muller {
    use std::vector;
    use std::debug;
    use aptos_std::fixed_point64::{Self, FixedPoint64};
    use aptos_std::math_fixed64;
    use aptos_std::math128;
    use ramstack::cos_sin;
    use ramstack::fixed_point64_with_sign::{Self, FixedPoint64WithSign};
    use ramstack::pi;
    const LN2: u128 = 12786308645202655660;
    public fun uniform_to_normal(random_numbers: vector<u64>, range: u64): (vector<u64>, vector<u64>) {
        let (first_part, second_part) = get_two_parts(random_numbers);

        (first_part, second_part)
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


    fun get_two_parts(random_numbers: vector<u64>): (vector<u64>, vector<u64>) {
        let n = vector::length(&random_numbers);
        let first_part = vector::empty<u64>();
        let second_part = vector::empty<u64>();

        let i = 0;

        while (i < n) {
            if (i < n / 2) {
                vector::push_back(&mut first_part, *vector::borrow(&random_numbers, i))
            } else {
                vector::push_back(&mut second_part, *vector::borrow(&random_numbers, i))
            };
            i = i + 1;
        };

        (first_part, second_part)
    }

    // #[test]
    // public fun test_uniform_to_normal() {
    //     let random_numbers = vector[1,2,3,4,5,6,7,8,9];
    //     let (first_part, second_part) = uniform_to_normal(random_numbers, 10);

    //     debug::print(&first_part);
    //     debug::print(&second_part);

    // }

    #[test]
    public fun test_nomalize_u1_u2() {
        let u1 = 1;
        let u2 = 5;
        let range = 10;
        let (value1, value2): (FixedPoint64WithSign, FixedPoint64WithSign) = normalize_u1_u2(u1, u2, range);
        debug::print(&value1);
        debug::print(&value2);
    }


}
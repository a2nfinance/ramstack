module ramstack::box_muller {
    use std::vector;
    use std::debug;
    use aptos_std::fixed_point64::{Self, FixedPoint64};
    use aptos_std::math_fixed64;
    use aptos_std::math128;
    use ramstack::cos_sin::{Self, FixedSignPoint64};
    public fun uniform_to_normal(random_numbers: vector<u64>, range: u64): (vector<u64>, vector<u64>) {
        let (first_part, second_part) = get_two_parts(random_numbers);

        (first_part, second_part)
    }

    fun nomalize_u1_u2(u1: FixedPoint64, u2: FixedPoint64): FixedPoint64 {
        let z0: FixedPoint64 = math_fixed64::sqrt(
            math_fixed64::mul_div(
                fixed_point64::create_from_raw_value(2),
                math_fixed64::log2_plus_64(u1),
                fixed_point64::create_from_raw_value(1)
            )
        );

        math_fixed64::ln_plus_32ln2(u1)
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
        let u1: FixedPoint64 = fixed_point64::create_from_rational(1, 10);
        let u2: FixedPoint64 = fixed_point64::create_from_rational(5, 10);
        // debug::print(&u1);
        let result: FixedPoint64 = nomalize_u1_u2(u1, u2);
        debug::print(&(math128::floor_log2(fixed_point64::get_raw_value(u1))));
        debug::print(&result);
    }


}
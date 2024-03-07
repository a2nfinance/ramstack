#[test_only]
module ramstack::math_fixed_point64_with_sign_test {

    use ramstack::math_fixed64_with_sign;
    use ramstack::fixed_point64_with_sign::{Self, FixedPoint64WithSign};
    use std::vector;
    use std::debug;

    const EINCORRECT_MINIMUM: u64 =  0;
    const EINCORRECT_MAXIMUM: u64 =  1;
    const EINCORRECT_MEAN: u64 =  2;
    const EINCORRECT_LOG2: u64 =  3;
    const EINCORRECT_EXP: u64 =  4;

    fun get_mock_numbers(): vector<FixedPoint64WithSign> {
        let numbers: vector<FixedPoint64WithSign> = vector::empty<FixedPoint64WithSign>();
        vector::push_back(&mut numbers, fixed_point64_with_sign::create_from_raw_value(10<<64, true));
        vector::push_back(&mut numbers, fixed_point64_with_sign::create_from_raw_value(3<<64, false));
        vector::push_back(&mut numbers, fixed_point64_with_sign::create_from_raw_value(4<<64, true));
        vector::push_back(&mut numbers, fixed_point64_with_sign::create_from_raw_value(5<<64, false));
        vector::push_back(&mut numbers, fixed_point64_with_sign::create_from_raw_value(11<<64, true));
        vector::push_back(&mut numbers, fixed_point64_with_sign::create_from_raw_value(7<<64, true));
        numbers
    }

    #[test]
    public fun test_minimum() {
        let numbers = get_mock_numbers();
        let corrected_minimum = fixed_point64_with_sign::create_from_raw_value(5<<64, false);
        let minimum = math_fixed64_with_sign::minimum(numbers);
        assert!(fixed_point64_with_sign::is_equal(minimum, corrected_minimum), EINCORRECT_MINIMUM)
    }

    #[test]
    public fun test_maximum() {
        let numbers = get_mock_numbers();
        let corrected_maximum = fixed_point64_with_sign::create_from_raw_value(11<<64, true);
        let maximum = math_fixed64_with_sign::maximum(numbers);
        assert!(fixed_point64_with_sign::is_equal(maximum, corrected_maximum), EINCORRECT_MAXIMUM)
    }

    #[test]
    public fun test_mean() {
        let numbers = get_mock_numbers();
        let corrected_mean= fixed_point64_with_sign::create_from_raw_value(4<<64, true);
        let mean = math_fixed64_with_sign::mean(numbers);
        assert!(fixed_point64_with_sign::is_equal(mean, corrected_mean), EINCORRECT_MEAN)
    }

    #[test]
    public fun test_log2() {
        let number= fixed_point64_with_sign::create_from_raw_value(2<<64, true);
        let corrected_log2= fixed_point64_with_sign::create_from_raw_value(1 << 64, true);
        let log2_number = math_fixed64_with_sign::log2(number);
        assert!(fixed_point64_with_sign::is_equal(log2_number, corrected_log2), EINCORRECT_LOG2)
    }

    #[test]
    public fun test_exp() {
        let number= fixed_point64_with_sign::create_from_raw_value(2<<64, false);
        let exp_number = math_fixed64_with_sign::exp(number);
        debug::print(&exp_number);
    }
}
#[test_only]
module ramstack::fixed_point64_with_sign_test {
    use ramstack::fixed_point64_with_sign;

    #[test]
    public fun test_add() {
        let x = fixed_point64_with_sign::create_from_raw_value(
            4 << 64,
            true
        );
        let y = fixed_point64_with_sign::create_from_raw_value(
            2 << 64,
            true
        );

        let x_sub_y = fixed_point64_with_sign::add(x, y);
        let is_equal = fixed_point64_with_sign::is_equal(
            x_sub_y, 
            fixed_point64_with_sign::create_from_raw_value(
                6 << 64,
                true
            )
        );

        assert!(is_equal, 0);

    }

    #[test]
    public fun test_sub() {
        let x = fixed_point64_with_sign::create_from_raw_value(
            4 << 64,
            true
        );
        let y = fixed_point64_with_sign::create_from_raw_value(
            2 << 64,
            true
        );

        let x_sub_y = fixed_point64_with_sign::sub(x, y);
        let is_equal = fixed_point64_with_sign::is_equal(x_sub_y, y);

        assert!(is_equal, 1);

    }

    #[test]
    public fun test_sub_with_negative() {
        let x = fixed_point64_with_sign::create_from_raw_value(
            2 << 64,
            true
        );
        let y = fixed_point64_with_sign::create_from_raw_value(
            4 << 64,
            true
        );

        let x_sub_y = fixed_point64_with_sign::sub(x, y);
        let is_equal = fixed_point64_with_sign::is_equal(
            x_sub_y,
            fixed_point64_with_sign::revert_sign(x)
        );

        assert!(is_equal, 2);
    }


    #[test]
    public fun test_less() {
        let x = fixed_point64_with_sign::create_from_raw_value(
            4 << 64,
            false
        );
        let y = fixed_point64_with_sign::create_from_raw_value(
            1 << 64,
            true
        );

        assert!(fixed_point64_with_sign::less(x, y), 3);
    }

}
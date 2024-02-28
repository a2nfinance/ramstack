#[test_only]
module ramstack::exponential_transform_test {
    use aptos_std::crypto_algebra::enable_cryptography_algebra_natives;
    use std::debug;
    use aptos_framework::randomness;
    use ramstack::exponential_tranform;
    use aptos_std::fixed_point64;

    #[test(fx = @aptos_framework)]
    public fun test_uniform_to_exponential(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let range = 20;
        let number = randomness::u64_range(0,20);
        debug::print(&number);
        let fixed_point_number = fixed_point64::create_from_rational(1, range);
        let lambda = fixed_point64::create_from_rational(1, 2);
        let random_number = exponential_tranform::uniform_to_exponential(fixed_point_number, lambda);
        debug::print(&random_number);
    }

    #[test(fx = @aptos_framework)]
    public fun test_uniform_to_exponential_multiple(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let range = 20;
        let lambda = fixed_point64::create_from_rational(1, 2);

        let i = 0;

        while(i < 20) {
            let number = randomness::u64_range(0,20);
            let fixed_point_number = fixed_point64::create_from_rational((number as u128), range);
            // debug::print(&number);
            let random_number = exponential_tranform::uniform_to_exponential(fixed_point_number, lambda);
            debug::print(&random_number);
            i = i + 1;
        };
   
    }
}

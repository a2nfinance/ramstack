#[test_only]
module ramstack::chisquare_transform_test {
    use aptos_std::crypto_algebra::enable_cryptography_algebra_natives;
    use std::debug;
    use aptos_framework::randomness;
    use ramstack::chisquare_transform;

    #[test(fx = @aptos_framework)]
    public fun test_uniform_to_chisquare(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let numbers = randomness::permutation(20);
        debug::print(&numbers);
        let random_numbers = chisquare_transform::uniform_to_chisquare(numbers, 20);
        debug::print(&random_numbers);
    }
}

#[test_only]
module ramstack::box_muller_test {
    use aptos_std::crypto_algebra::enable_cryptography_algebra_natives;
    use std::debug;
    use aptos_framework::randomness;
    use ramstack::box_muller;

    #[test(fx = @aptos_framework)]
    public fun test_nomalize_u1_u2(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let random_numbers = box_muller::generate_numbers_with_permutation(20);
        debug::print(&random_numbers);
    }

    #[test(fx = @aptos_framework)]
    public fun test_uniform_to_normal(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let size = 200;
        let min_incl = 0;
        let max_excl = 20;
        let random_numbers = box_muller::generate_numbers_with_range(size, min_incl, max_excl);
        debug::print(&random_numbers);
    }
}
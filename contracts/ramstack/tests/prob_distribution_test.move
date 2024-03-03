#[test_only]
module ramstack::prob_distribution_test {
    use ramstack::prob_distribution;
    use std::debug;
    use aptos_framework::randomness;
    use aptos_std::crypto_algebra::enable_cryptography_algebra_natives;


    #[test(fx = @aptos_framework)]
    public fun test_get_nd_random_numbers(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let min_incl = 1;
        let max_excl = 11;
        let size = 100;

        let random_numbers = prob_distribution::get_nd_random_numbers(size, min_incl, max_excl);
        // debug::print(&random_numbers);
    }

    #[test(fx = @aptos_framework)]
    public fun test_get_ed_random_numbers(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let min_incl = 0;
        let max_excl = 10;
        let size = 100;
        let lambda = 1 << 63; // 0.5 << 64 = 1<<63
        let random_numbers = prob_distribution::get_ed_random_numbers(size, min_incl, max_excl, lambda);
        // debug::print(&random_numbers);
    }

    #[test(fx = @aptos_framework)]
    public fun test_get_ll_random_numbers(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let min_incl = 0;
        let max_excl = 10;
        let size = 100;
        let mu = 0; // 0 << 64 = 0
        let beta = 1 << 64;
        let random_numbers = prob_distribution::get_ll_random_numbers(size, min_incl, max_excl, mu, beta);
        // debug::print(&random_numbers);
    }

    #[test(fx = @aptos_framework)]
    public fun test_get_cq_random_numbers(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let min_incl = 0;
        let max_excl = 10;
        let size = 100;
        let random_numbers = prob_distribution::get_cq_random_numbers(size, min_incl, max_excl);
        debug::print(&random_numbers);
    }
}
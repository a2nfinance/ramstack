#[test_only]
module ramstack::monte_carlo_test {
    use aptos_std::crypto_algebra::enable_cryptography_algebra_natives;
    use std::debug;
    use aptos_framework::randomness;
    use ramstack::monte_carlo;

    #[test]
    public fun test_init_2d_vector() {
        let spath = monte_carlo::init_2d_vector(10, 15, 1);

        debug::print(&spath);
    }

    #[test(fx = @aptos_framework)]
    public fun test_generate_spath_with_permutation(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let s0 = 100 << 64;
        let r = 553402322211286548;
        let sigma = 4611686018427387904;
        let t = 9223372036854775808;
        let nsteps = 20;
        let nrep = 10;
        let spath = monte_carlo::generate_spath_with_permutation(s0, r, sigma, t, nsteps, nrep);
        debug::print(&spath);
    }

    #[test(fx = @aptos_framework)]
    public fun test_generate_spath_with_range(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let s0 = 100 << 64;
        let r = 553402322211286548;
        let sigma = 4611686018427387904;
        let t = 9223372036854775808;
        let nsteps = 20;
        let nrep = 10;
        let spath = monte_carlo::generate_spath_with_range(s0, r, sigma, t, nsteps, nrep, 50);
        debug::print(&spath);
    }
}
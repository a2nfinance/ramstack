#[test_only]
module ramstack::price_simulation_test {
    use ramstack::price_simulation;
    use std::debug;
    use std::vector;
    use aptos_framework::randomness;
    use aptos_std::crypto_algebra::enable_cryptography_algebra_natives;
    const EINCORRECT_LEGTH: u64 = 0;

    #[test(fx = @aptos_framework)]
    public fun test_get_spath_without_excl(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let s0 = 100 << 64;
        let r = 553402322211286548;
        let sigma = 4611686018427387904;
        let t = 9223372036854775808;
        let nsteps = 10;
        let nrep = 4;
        let spath = price_simulation::get_spath_without_excl(s0, r, sigma, t, nsteps, nrep);
        assert!(vector::length(&spath) == 4, EINCORRECT_LEGTH);
    }

    #[test(fx = @aptos_framework)]
    public fun test_get_spath_with_excl(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let s0 = 100 << 64;
        let r = 553402322211286548;
        let sigma = 4611686018427387904;
        let t = 9223372036854775808;
        let nsteps = 20;
        let nrep = 10;
        let excl = 50;
        let spath = price_simulation::get_spath_with_excl(s0, r, sigma, t, nsteps, nrep, excl);
        debug::print(&spath);
        assert!(vector::length(&spath) == 10, EINCORRECT_LEGTH);
    }

}
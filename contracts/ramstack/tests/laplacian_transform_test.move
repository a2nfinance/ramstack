#[test_only]
module ramstack::laplacian_transform_test {
    use ramstack::laplacian_transform;
    use aptos_std::crypto_algebra::enable_cryptography_algebra_natives;
    use std::debug;
    use aptos_framework::randomness;

    #[test(fx = @aptos_framework)]
    public fun test_uniform_to_laplacian(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let mu = 0; // 0 << 64 = 0
        let beta = 1 << 64;
        let range = 100;
        let uniform_number = randomness::u64_range(1, range);
        let laplacian_number = laplacian_transform::uniform_to_laplacian((uniform_number as u128), (range as u128), mu, beta);
        debug::print(&laplacian_number);
    }

    #[test(fx = @aptos_framework)]
    public fun test_uniform_to_laplacian_multiple(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let mu = 0; // 0 << 64 = 0
        let beta = 1 << 64;
        let range = 10;
        let loop_number = 20;
        let i = 0;
        while(i < loop_number) {
      
            let uniform_number = randomness::u64_range(0, range);
            let laplacian_number = laplacian_transform::uniform_to_laplacian((uniform_number as u128), (range as u128), mu, beta);
            debug::print(&uniform_number);
            debug::print(&laplacian_number);
            i = i + 1;
        }
        
    }
}
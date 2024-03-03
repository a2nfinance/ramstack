#[test_only]
module ramstack::box_muller_test {

    use aptos_std::crypto_algebra::enable_cryptography_algebra_natives;
    use std::debug;
    use std::vector;
    use aptos_framework::randomness;
    use ramstack::box_muller;

    #[test(fx = @aptos_framework)]
    public fun test_nomalize_u1_u2(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let numbers = randomness::permutation(20);
        debug::print(&numbers);
        let random_numbers = box_muller::uniform_to_normal(numbers, 20);
        debug::print(&random_numbers);
    }

    #[test(fx = @aptos_framework)]
    public fun test_uniform_to_normal(fx: signer) {
        enable_cryptography_algebra_natives(&fx);
        randomness::initialize_for_testing(&fx);
        let i = 0;
        let size = 200;
        let range = 11;
        let numbers: vector<u64> = vector::empty<u64>();
        while(i < size) {
            let number = randomness::u64_range(1,range);
            vector::push_back(&mut numbers, number);
            i = i + 1;
        };
        let random_numbers = box_muller::uniform_to_normal(numbers, (range as u128));
        debug::print(&random_numbers);
    }
}
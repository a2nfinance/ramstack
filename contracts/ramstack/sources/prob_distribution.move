module ramstack::prob_distribution {
    use aptos_framework::randomness;
    use std::vector;
    use ramstack::box_muller;
    use ramstack::exponential_transform;
    use ramstack::laplacian_transform;
    use ramstack::chisquare_transform;
    use ramstack::fixed_point64_with_sign::{FixedPoint64WithSign};
    use aptos_std::fixed_point64::{Self, FixedPoint64};
    const EINCORRECT_RANGE: u64 = 0;
    const EINCORRECT_SIZE: u64 = 0;

    #[view]
    public fun get_nd_random_numbers(size: u64, min_incl: u64, max_excl: u64): (vector<FixedPoint64WithSign>) {

        assert!(max_excl > min_incl, EINCORRECT_RANGE);
        assert!(size > 0, EINCORRECT_SIZE);

        let range = max_excl - min_incl;
        let random_numbers: vector<u64> = vector::empty<u64>();
        let i = 0 ;

        while( i < size ) {
           
            let random_number = randomness::u64_range(min_incl + 1, max_excl);
            random_number = random_number - min_incl;
            vector::push_back(&mut random_numbers, random_number);
            i = i + 1;
        };

        let normalized_random_numbers = box_muller::uniform_to_normal(random_numbers, (range as u128));

        normalized_random_numbers

    }

    #[view]
    public fun get_ed_random_numbers(size: u64, min_incl: u64, max_excl: u64, lambda: u128): (vector<FixedPoint64>) {

        assert!(max_excl > min_incl, EINCORRECT_RANGE);
        assert!(size > 0, EINCORRECT_SIZE);
        let lambda_fixed_point64 = fixed_point64::create_from_raw_value(lambda);

        let range = max_excl - min_incl;
        let random_numbers: vector<FixedPoint64> = vector::empty<FixedPoint64>();
        let i = 0 ;

        while( i < size ) {
            let random_number = randomness::u64_range(min_incl, max_excl);
            random_number = random_number - min_incl;
            let ed_random_number = exponential_transform::uniform_to_exponential((random_number as u128), (range as u128), lambda_fixed_point64);
            vector::push_back(&mut random_numbers, ed_random_number);
            i = i + 1;
        };
        random_numbers

    }

    #[view]
    public fun get_ll_random_numbers(size: u64, min_incl: u64, max_excl: u64, mu: u128, beta: u128): (vector<FixedPoint64WithSign>) {

        assert!(max_excl > min_incl, EINCORRECT_RANGE);
        assert!(size > 0, EINCORRECT_SIZE);

        let range = max_excl - min_incl;
        let random_numbers: vector<FixedPoint64WithSign> = vector::empty<FixedPoint64WithSign>();
        let i = 0 ;

        while( i < size ) {
            
            let random_number = randomness::u64_range(min_incl + 1, max_excl);
            random_number = random_number - min_incl;
            let ll_random_number = laplacian_transform::uniform_to_laplacian((random_number as u128), (range as u128), mu, beta);
            vector::push_back(&mut random_numbers, ll_random_number);
            i = i + 1;
        };
        random_numbers

    }


    #[view]
    public fun get_cq_random_numbers(size: u64, min_incl: u64, max_excl: u64): (vector<FixedPoint64>) {

        assert!(max_excl > min_incl, EINCORRECT_RANGE);
        assert!(size > 0, EINCORRECT_SIZE);

        let range = max_excl - min_incl;
        let random_numbers: vector<u64> = vector::empty<u64>();
        let i = 0 ;

        while( i < size ) {
            let random_number = randomness::u64_range(min_incl + 1, max_excl);
            random_number = random_number - min_incl;
            vector::push_back(&mut random_numbers, random_number);
            i = i + 1;
        };
        let ll_random_numbers = chisquare_transform::uniform_to_chisquare(random_numbers, (range as u128));
        ll_random_numbers
    }
}
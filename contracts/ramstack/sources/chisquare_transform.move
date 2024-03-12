module ramstack::chisquare_transform {
    use ramstack::box_muller;
    use ramstack::fixed_point64_with_sign::{Self, FixedPoint64WithSign};
    use aptos_std::fixed_point64::{Self, FixedPoint64};
    use aptos_std::math_fixed64;
    use std::vector;

    // Calculate a random number following the Chi-square distribution with one degree of freedom
    // Step 1: Generate random numbers from the Aptos Randomness API.
    // Step 2: Convert these numbers to random numbers of the normal distribution.
    // Step 3: Square each converted number.
    public fun uniform_to_chisquare(uniform_numbers: vector<u64>, range: u128): vector<FixedPoint64> {
        let normalized_numbers:vector<FixedPoint64WithSign> = box_muller::uniform_to_normal(uniform_numbers, range);

        let chisquare_numbers: vector<FixedPoint64> = vector::empty<FixedPoint64>();

        let i = 0;
        let max: u128 =  0;
        while(i < vector::length(&normalized_numbers)) {
            
            let number = vector::borrow(&normalized_numbers, i);
            let raw_value = fixed_point64_with_sign::get_raw_value(*number);
          
            if (max < raw_value) {max = raw_value};
            i = i + 1;
        };

        i = 0;
        while(i < vector::length(&normalized_numbers)) {
            let number = vector::borrow(&normalized_numbers, i);
            let raw_value = fixed_point64_with_sign::get_raw_value(*number);
            // return to N(0,1)
            let normalized_number = math_fixed64::mul_div(
                fixed_point64::create_from_raw_value(raw_value),
                fixed_point64::create_from_raw_value(1 << 64),
                fixed_point64::create_from_raw_value(max),
            );
            vector::push_back(
                &mut chisquare_numbers, 
                math_fixed64::pow(
                    normalized_number, 
                    2
                )
            );
            i = i + 1;
        };

        chisquare_numbers
    }
}
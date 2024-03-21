// Given two random numbers, U1 and U2, which belong to a uniform distribution in the range (0,1).
// We can generate two random numbers following a normal distribution:
// Z1 = sqrt(-2*ln(U1)) * cos(2*PI*U2)
// Z2 = sqrt(-2*ln(U1)) * sin(2*PI*U2)
module ramstack::box_muller {
    use std::vector;
    use aptos_std::math128;

    use ramstack::cos_sin;
    use ramstack::fixed_point64_with_sign::{Self, FixedPoint64WithSign};
    use ramstack::pi;
    use ramstack::math_fixed64_with_sign;
    const LN2: u128 = 12786308645202655660;

    // random_numbers: a vector of u64 random numbers within the specified range.
    // range: counts from 0, for example: (0,20)
    public fun uniform_to_normal(random_numbers: vector<u64>, range: u128): vector<FixedPoint64WithSign> {
        let (first_part, second_part) = get_two_parts(random_numbers);

  
        let len_first_part = vector::length(&first_part);

        let nomalized_first_part = vector::empty<FixedPoint64WithSign>();
        let nomalized_second_part = vector::empty<FixedPoint64WithSign>();

        let i = 0;
        while(i < len_first_part) {
            let (z0, z1) = normalize_u1_u2(*vector::borrow(&first_part, i), *vector::borrow(&second_part, i), range);
            vector::push_back(&mut nomalized_first_part, z0);
            vector::push_back(&mut nomalized_second_part, z1);
            i = i + 1;
        };

        vector::append(&mut nomalized_first_part, nomalized_second_part);
        nomalized_first_part

    }

    // u1 and u2 belong to (0, range)
    // returns z0 and z1 of normal distribution, these are two signed numbers.
    public fun normalize_u1_u2(u1: u128, u2: u128, range: u128): (FixedPoint64WithSign, FixedPoint64WithSign) {
    
        let pi_value = pi::get_pi_const();
        let cos_u2 =  cos_sin::cosx(
            math128::mul_div(2 * pi_value, u2, range),
            10
        );

        let sin_u2 = cos_sin::sinx(
            math128::mul_div(2 * pi_value, u2, range),
            10
        );
        // U1 need to be converted to (0,1): U1 = u1/range
        // -2 * ln(U1) = ln(U1**(-2))= ln(1 / U1**2) = ln(range**2 / u1**2).
        // This value is always positive because the standardlized u1 belongs to (0,1).
        let ln_square_normalized_u1: FixedPoint64WithSign = math_fixed64_with_sign::ln(
            fixed_point64_with_sign::create_from_rational(range * range, u1 * u1, true)
        );
        
    
        let sqrt: FixedPoint64WithSign = math_fixed64_with_sign::sqrt(ln_square_normalized_u1);

        let z0: FixedPoint64WithSign = math_fixed64_with_sign::mul(
            sqrt,
            cos_u2,
        );

        let z1: FixedPoint64WithSign = math_fixed64_with_sign::mul(
            sqrt,
            sin_u2,
  
        );

        (
            z0,
            z1
        )
        
    }

    // Get two parts of random numbers:
    // The first part is an array of U1
    // The second part is an array of U2
    fun get_two_parts(random_numbers: vector<u64>): (vector<u128>, vector<u128>) {
        let n = vector::length(&random_numbers);
        let first_part = vector::empty<u128>();
        let second_part = vector::empty<u128>();

        let i = 0;

        while (i < n) {
            if (i < n / 2) {
                vector::push_back(&mut first_part, (*vector::borrow(&random_numbers, i) as u128))
            } else {
                vector::push_back(&mut second_part,(*vector::borrow(&random_numbers, i) as u128))
            };
            i = i + 1;
        };

        (first_part, second_part)
    }

}
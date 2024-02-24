module ramstack::fixed_point64_with_sign {
    struct FixedPoint64WithSign has copy, drop {
        value: u128,
        positive: bool,
    }


    public fun get_raw_value(x: FixedPoint64WithSign): u128 {
        x.value
    }

    public fun is_positive(x: FixedPoint64WithSign): bool {
        x.positive
    }

    public fun create_from_raw_value(value: u128, positive: bool): FixedPoint64WithSign {
        FixedPoint64WithSign {
            value,
            positive
        }
    }

}
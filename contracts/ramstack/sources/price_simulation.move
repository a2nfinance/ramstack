module ramstack::price_simulation {

    use ramstack::monte_carlo;

    #[view]
    public fun get_spath_without_excl(s0: u128, r: u128, sigma: u128, t: u128, nsteps: u64, nrep: u64, is_positive_r: bool): vector<vector<u128>> {
        // max_excl: default value is 20
        monte_carlo::generate_spath_with_range(s0, r, sigma, t, nsteps, nrep, 20, is_positive_r)
    }

    #[view]
    public fun get_spath_with_excl(s0: u128, r: u128, sigma: u128, t: u128, nsteps: u64, nrep: u64, max_excl: u64, is_positive_r: bool): vector<vector<u128>>{
        monte_carlo::generate_spath_with_range(s0, r, sigma, t, nsteps, nrep, max_excl, is_positive_r)
    }
    
}
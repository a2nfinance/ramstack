import { setPricePathProps, setSimulationProps } from "@/controller/simulation/simulationSlice";
import { store } from "@/controller/store";
import { convertPathsData } from "@/helper/data_converter";
import { InputViewRequestData, MoveValue } from "@aptos-labs/ts-sdk";
import axios from "axios";
import {
    abs,
    exp,
    log,
    mean,
    std
} from 'mathjs';

import { actionNames, updateActionStatus } from "@/controller/process/processSlice";
import { getAptos, packageAddress } from "./aptos_client";

const aptos = getAptos();

type FormValues = {
    pair: string,
    interval: number,
    interval_type: string,
    limit: number,
    nrep: number,
    nsteps: number,
    t: number,
    nsimulation: number
}
export const getPricePaths = async (values: FormValues) => {
    try {
        store.dispatch(updateActionStatus({ actionName: actionNames.simulatePriceAction, value: true }));
        let { s0, r, sigma, is_positive_r } = await getTokenPriceHistory(values.pair, `${values.interval}${values.interval_type}`, values.limit);
        let t = BigInt(values.t * 2 ** 64);
        // dispatch t here
        store.dispatch(setSimulationProps({ key: "t", value: values.t }));
        let nsteps = values.nsteps;
        let nrep = values.nrep;
        const payload: InputViewRequestData = {
            function: `${packageAddress}::price_simulation::get_spath_without_excl`,
            functionArguments: [s0.toString(), r.toString(), sigma.toString(), t.toString(), nsteps.toString(), nrep.toString(), is_positive_r],
        }
        let totalPaths = [];
        for (let i = 0; i < values.nsimulation; i++) {
            let paths: MoveValue = await aptos.view({ payload: payload });
            totalPaths = totalPaths.concat(paths[0]);
        }

        let convertedData = convertPathsData(totalPaths, nsteps, nrep * values.nsimulation);
        store.dispatch(setPricePathProps({ ...convertedData, rep: nrep * values.nsimulation }));
    } catch (e) {
        console.log(e);
    }
    store.dispatch(updateActionStatus({ actionName: actionNames.simulatePriceAction, value: false }));
}

export const getTokenPriceHistory = async (symbol: string, interval: string, limit: number) => {
    try {
        const response = await axios.get('https://api.binance.com/api/v3/klines', {
            params: {
                symbol: symbol,
                interval: interval,
                limit: limit
            }
        });

        const priceHistory = response.data;
        let dailyReturns: number[] = [];
        for (let i = 0; i < priceHistory.length; i++) {
            if (i < priceHistory.length - 1) {
                dailyReturns.push(
                    log(parseFloat(priceHistory[i][4])) - log(parseFloat(priceHistory[i + 1][4]))
                )
            }

        }
        const meanDailyReturn = mean(dailyReturns);
        const movingVolatility = std(dailyReturns);
        const lastClosedPrice = priceHistory[priceHistory.length - 1][4];

        console.log(`Mean price (mu): ${meanDailyReturn}`);
        console.log(`Standard deviation: ${movingVolatility}`);
        // set R
        store.dispatch(setSimulationProps({ key: "r", value: meanDailyReturn }));
        return {
            s0: BigInt(lastClosedPrice * 2 ** 64),
            r: BigInt((abs(meanDailyReturn) * 2 ** 64).toFixed(0)),
            sigma: BigInt((parseFloat(movingVolatility.toString()) * 2 ** 64).toFixed(0)),
            is_positive_r: (meanDailyReturn > 0)
        }
    } catch (error) {
        console.log(error);
    }

    return {
        s0: 0,
        r: 0,
        sigma: 0,
        is_positive_r: false
    }


}


export const calculateOptionPrice = (values: { call_or_put: "call" | "put", strike_price: number }) => {
    try {

        let { paths, rep, t, r } = store.getState().simulation;
        let lastColumns = paths.map(p => p[`P${rep - 1}`]);
        let optionPrice = 0;
        if (values.call_or_put === "call") {
            let columSubK = lastColumns.map(lc => lc - values.strike_price);
            let payoffs = columSubK.filter(value => value > 0);
            optionPrice = mean(payoffs) * exp(r * t * -1);
        } else {
            let columSubK = lastColumns.map(lc => values.strike_price - lc);
            let payoffs = columSubK.filter(value => value > 0);
            optionPrice = mean(payoffs) * exp(r * t * -1);
        }

        return optionPrice;

    } catch (e) {
        console.log(e);
    }
    return 0;
} 
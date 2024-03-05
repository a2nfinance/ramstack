import { setPricePathProps } from "@/controller/simulation/simulationSlice";
import { store } from "@/controller/store";
import { convertPathsData } from "@/helper/data_converter";
import { InputViewRequestData, MoveValue } from "@aptos-labs/ts-sdk";
import axios from "axios";
import {
    abs,
    log,
    mean,
    std
} from 'mathjs';

import { getAptos, packageAddress } from "./aptos_client";
import { actionNames, updateActionStatus } from "@/controller/process/processSlice";

const aptos = getAptos();

type FormValues = {
    pair: string,
    interval: number,
    interval_type: string,
    limit: number,
    nrep: number,
    nsteps: number,
    t: number
}
export const getPricePaths = async (values: FormValues) => {
    try {
        store.dispatch(updateActionStatus({ actionName: actionNames.simulatePriceAction, value: true }));
        let { s0, r, sigma, is_positive_r } = await getTokenPriceHistory(values.pair, `${values.interval}${values.interval_type}`, values.limit);
        let t = BigInt(values.t * 2 ** 64);
        let nsteps = values.nsteps;
        let nrep = values.nrep;
        const payload: InputViewRequestData = {
            function: `${packageAddress}::price_simulation::get_spath_without_excl`,
            functionArguments: [s0.toString(), r.toString(), sigma.toString(), t.toString(), nsteps.toString(), nrep.toString(), is_positive_r],
        }
        let paths: MoveValue = await aptos.view({ payload: payload });
        let convertedData = convertPathsData(paths[0], nsteps, nrep);
        store.dispatch(setPricePathProps({ ...convertedData, rep: nrep }));
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
        return {
            s0: BigInt(lastClosedPrice * 2 ** 64),
            r: BigInt(abs(meanDailyReturn) * 2 ** 64),
            sigma: BigInt(parseFloat(movingVolatility.toString()) * 2 ** 64),
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
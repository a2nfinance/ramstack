import { InputViewRequestData, MoveValue } from "@aptos-labs/ts-sdk";
import { getAptos, packageAddress } from "./aptos_client";
import { convertCQNumbersToChartPoint, convertExpNumbersToChartPoint, convertLLNumbersToChartPoint, convertNDNumbersToChartPoint } from "@/helper/data_converter";
import { store } from "@/controller/store";
import { setProps } from "@/controller/distribution/distributionSlice";
import { actionNames, updateActionStatus } from "@/controller/process/processSlice";

const aptos = getAptos();

// Random numbers of normal distribution
export const getNDRandomNumber = async (values: {size: number, min_excl: number, max_excl: number}) => {

    try {
        store.dispatch(updateActionStatus({ actionName: actionNames.getRandomNumberAction, value: true }));
        const payload: InputViewRequestData = {
            function: `${packageAddress}::prob_distribution::get_nd_random_numbers`,
            functionArguments: [values.size.toString(), values.min_excl.toString(), values.max_excl.toString()],
        }
        let numbers: MoveValue = await aptos.view({ payload: payload });
        const {ndChartPoints} = convertNDNumbersToChartPoint(numbers[0], 0.2);
        store.dispatch(setProps({key: "ndChartPoints", value: ndChartPoints}))
    } catch(e) {
        console.log(e);
    }
    store.dispatch(updateActionStatus({ actionName: actionNames.getRandomNumberAction, value: false }));
}

export const getLLRandomNumber = async (values: {size: number, min_excl: number, max_excl: number, mu: number, beta: number}) => {

    try {
        store.dispatch(updateActionStatus({ actionName: actionNames.getRandomNumberAction, value: true }));
        let muFixedPoint64 = BigInt(values.mu * 2**64);
        let betaFixedPoint64 = BigInt(values.beta * 2**64);
        const payload: InputViewRequestData = {
            function: `${packageAddress}::prob_distribution::get_ll_random_numbers`,
            functionArguments: [
                values.size.toString(), 
                values.min_excl.toString(), 
                values.max_excl.toString(), 
                muFixedPoint64.toString(),
                betaFixedPoint64.toString()
            ],
        }
        let numbers: MoveValue = await aptos.view({ payload: payload });
        const {llChartPoints} = convertLLNumbersToChartPoint(numbers[0], 0.5);
        store.dispatch(setProps({key: "llChartPoints", value: llChartPoints}))
    } catch(e) {
        console.log(e);
    }
    store.dispatch(updateActionStatus({ actionName: actionNames.getRandomNumberAction, value: false }));
}



export const getEXPRandomNumber = async (values: {size: number, min_excl: number, max_excl: number, lambda: number}) => {

    try {
        store.dispatch(updateActionStatus({ actionName: actionNames.getRandomNumberAction, value: true }));
        let lambdaFixedPoint64 = BigInt(values.lambda * 2**64);
        const payload: InputViewRequestData = {
            function: `${packageAddress}::prob_distribution::get_ed_random_numbers`,
            functionArguments: [
                values.size.toString(), 
                values.min_excl.toString(), 
                values.max_excl.toString(), 
                lambdaFixedPoint64.toString()
            ],
        }
        let numbers: MoveValue = await aptos.view({ payload: payload });
        const {expChartPoints} = convertExpNumbersToChartPoint(numbers[0], 1);
        store.dispatch(setProps({key: "expChartPoints", value: expChartPoints}))
    } catch(e) {
        console.log(e);
    }
    store.dispatch(updateActionStatus({ actionName: actionNames.getRandomNumberAction, value: false }));
}


export const getCQRandomNumber = async (values: {size: number, min_excl: number, max_excl: number}) => {

    try {
        store.dispatch(updateActionStatus({ actionName: actionNames.getRandomNumberAction, value: true }));
        const payload: InputViewRequestData = {
            function: `${packageAddress}::prob_distribution::get_cq_random_numbers`,
            functionArguments: [values.size.toString(), values.min_excl.toString(), values.max_excl.toString()],
        }
        let numbers: MoveValue = await aptos.view({ payload: payload });
        const {cqChartPoints} = convertCQNumbersToChartPoint(numbers[0], 0.1);
        store.dispatch(setProps({key: "cqChartPoints", value: cqChartPoints}))
    } catch(e) {
        console.log(e);
    }
    store.dispatch(updateActionStatus({ actionName: actionNames.getRandomNumberAction, value: false }));
}
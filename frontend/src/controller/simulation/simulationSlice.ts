import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";

type State =  {
    paths: any[],
    minValue: number,
    maxValue: number,
    rep: number
}

const initialState: State = {
    paths: [],
    minValue: 0,
    maxValue: 0,
    rep: 0
}

export const simulationSlice = createSlice({
    name: 'simulation',
    initialState,
    reducers: {
        setPricePathProps: (state, action: PayloadAction<{paths: any[], minValue: number, maxValue: number, rep: number}>) => {
            state.paths = action.payload.paths;
            state.minValue = action.payload.minValue;
            state.maxValue = action.payload.maxValue;
            state.rep = action.payload.rep;
        },
        setSimulationProps: (state, action: PayloadAction<{key: string, value: any}>) => {
            state[action.payload.key] = action.payload.value;
        },
    }
})

export const { setPricePathProps, setSimulationProps } = simulationSlice.actions;
export default simulationSlice.reducer;
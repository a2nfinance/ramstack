import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";

export type ChartPoint = {point: string, count: number};

type State =  {
    ndRandomNumbers: number[],
    ndChartPoints: ChartPoint[],
    llRandomNumbers: number[],
    llChartPoints: ChartPoint[],
    expRandomNumbers: number[],
    expChartPoints: ChartPoint[],
    cqRandomNumbers: number[],
    cqChartPoints: ChartPoint[]

}

const initialState: State = {
    ndRandomNumbers: [],
    ndChartPoints: [],
    llRandomNumbers: [],
    llChartPoints: [],
    expRandomNumbers: [],
    expChartPoints: [],
    cqRandomNumbers: [],
    cqChartPoints: []
}

export const distributionSlice = createSlice({
    name: 'distribution',
    initialState,
    reducers: {
        setProps: (state, action: PayloadAction<{key: string, value: any}>) => {
            state[action.payload.key] = action.payload.value;
        },
    }
})

export const { setProps } = distributionSlice.actions;
export default distributionSlice.reducer;
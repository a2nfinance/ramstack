import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";

export type ChartPoint = {point: string, count: number, numbers: number[], range: number};

type State =  {
    ndChartPoints: ChartPoint[],
    llChartPoints: ChartPoint[],
    expChartPoints: ChartPoint[],
    cqChartPoints: ChartPoint[]

}

const initialState: State = {
    ndChartPoints: [],
    llChartPoints: [],
    expChartPoints: [],
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
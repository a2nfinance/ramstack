import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { number } from "mathjs";

type State =  {
    paths: any[],
    minValue: number,
    maxValue: number,
    rep: number,
    visibleCells: boolean[][]
}

const initialState: State = {
    paths: [],
    minValue: 0,
    maxValue: 0,
    rep: 0,
    visibleCells: []
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
            state.visibleCells = new Array(action.payload.rep).fill(0).map(row =>  new Array(action.payload.paths.length).fill(true));
        },
        setSimulationProps: (state, action: PayloadAction<{key: string, value: any}>) => {
            state[action.payload.key] = action.payload.value;
        },
        changeVisibleCell: (state, action: PayloadAction<{row_index: number, col_index: number}>) => {
            let currentValue = state.visibleCells[action.payload.row_index][action.payload.col_index];
            state.visibleCells[action.payload.row_index][action.payload.col_index] = !currentValue
        }
    }
})

export const { setPricePathProps, setSimulationProps, changeVisibleCell } = simulationSlice.actions;
export default simulationSlice.reducer;
import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";


type State =  {
    paths: any[],
    minValue: number,
    maxValue: number,
    rep: number,
    visibleCells: boolean[][],
    visiblePaths: boolean[],
    r: number,
    t: number
}

const initialState: State = {
    paths: [],
    minValue: 0,
    maxValue: 0,
    rep: 0,
    visibleCells: [],
    visiblePaths: [],
    r: 0,
    t: 0
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
            state.visiblePaths = new Array(action.payload.rep).fill(true);
        },
        setSimulationProps: (state, action: PayloadAction<{key: string, value: any}>) => {
            state[action.payload.key] = action.payload.value;
        },
        changeVisibleCell: (state, action: PayloadAction<{row_index: number, col_index: number}>) => {
            let currentValue = state.visibleCells[action.payload.row_index][action.payload.col_index];
            state.visibleCells[action.payload.row_index][action.payload.col_index] = !currentValue
        },
        changeVisiblePath: (state, action: PayloadAction<number>) => {
            state.visiblePaths[action.payload] = !state.visiblePaths[action.payload];
        }
    }
})

export const { setPricePathProps, setSimulationProps, changeVisibleCell, changeVisiblePath } = simulationSlice.actions;
export default simulationSlice.reducer;
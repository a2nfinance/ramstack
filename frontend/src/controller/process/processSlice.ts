import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";

export const actionNames = {
    getRandomNumberAction: "getRandomNumberAction",
    simulatePriceAction: "simulatePriceAction"
}


type Processes = {
    [key: string]: boolean
}

const initialState: Processes = {
    getRandomNumberAction: false,
    simulatePriceAction: false
}

export const processesSlice = createSlice({
    name: 'process',
    initialState,
    reducers: {
        updateActionStatus: (state, action: PayloadAction<{ actionName: string, value: boolean }>) => {
            state[action.payload.actionName] = action.payload.value;
        },
    }
})

export const { updateActionStatus } = processesSlice.actions;
export default processesSlice.reducer;
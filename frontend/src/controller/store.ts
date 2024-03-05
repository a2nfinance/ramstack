import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import processReducer from './process/processSlice';
import simulationReducer from './simulation/simulationSlice';


export function makeStore() {
    return configureStore({
        reducer: {
            process: processReducer,
            simulation: simulationReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    })
}

export const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>  
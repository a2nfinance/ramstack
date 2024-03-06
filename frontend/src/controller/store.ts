import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import processReducer from './process/processSlice';
import simulationReducer from './simulation/simulationSlice';
import distributionReducer from './distribution/distributionSlice';

export function makeStore() {
    return configureStore({
        reducer: {
            process: processReducer,
            simulation: simulationReducer,
            distribution: distributionReducer
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
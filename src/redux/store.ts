import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../services/users";

const rootReducer = combineReducers({
    [usersApi.reducerPath]: usersApi.reducer
})


export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware)
    })
}
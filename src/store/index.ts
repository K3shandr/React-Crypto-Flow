import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { coinsApi } from "./coins/coins.api";
import coinReducer from "./coins/coins.slice";

export const store = configureStore({
	reducer : {
		[coinsApi.reducerPath]: coinsApi.reducer,
		coins: coinReducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(coinsApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
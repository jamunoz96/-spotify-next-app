import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import storeReducer from "./storeSlice";

export function makeStore() {
  return configureStore({
    reducer: { storeReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;

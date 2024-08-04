import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import storeSlice from "./store-slice";

const store = configureStore({
  reducer: {
    store: storeSlice.reducer,
    // Add your reducers here
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;

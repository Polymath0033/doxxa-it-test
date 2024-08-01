import { configureStore } from "@reduxjs/toolkit";

import storeSlice from "./store-slice";

const store = configureStore({
  reducer: {
    store: storeSlice.reducer,
    // Add your reducers here
  },
});
export default store;

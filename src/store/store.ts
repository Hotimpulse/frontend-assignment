import { configureStore } from "@reduxjs/toolkit";
import adsReducer from "./AllListings/allListingsSlice";

const store = configureStore({
  reducer: {
    ads: adsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

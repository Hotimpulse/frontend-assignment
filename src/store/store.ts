import { configureStore } from "@reduxjs/toolkit";
import adsReducer from "./AllListings/allListingsSlice";
import listingReducer from "./Listing/listingSlice";

const store = configureStore({
  reducer: {
    ads: adsReducer,
    listing: listingReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

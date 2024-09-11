import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdvertisment } from "@src/interfaces/IAdvertisment";

interface IAdvertisments {
  listings: IAdvertisment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: IAdvertisments = {
  listings: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const adSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    setAds(state, action: PayloadAction<IAdvertisment[]>) {
      state.listings = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setAds, setCurrentPage, setTotalPages, setError } =
  adSlice.actions;

export default adSlice.reducer;

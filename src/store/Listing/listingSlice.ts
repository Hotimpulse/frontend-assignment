import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdvertisment } from "@src/interfaces/IAdvertisment";

interface IListing {
  listing: IAdvertisment;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: IListing = {
  listing: {
    id: "",
    name: "",
    price: 0,
    createdAt: "",
    views: 0,
    likes: 0,
  },
  status: "idle",
  error: null,
};

export const fetchListingInfo = createAsyncThunk(
  "listing/fetchListingInfo",
  async (id: string) => {
    const response = await fetch(`http://localhost:8000/advertisements/${id}`);

    if (!response.ok) throw new Error("Error getting item data!");

    const data: IAdvertisment = await response.json();
    return data;
  }
);

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setListing(state, action: PayloadAction<IAdvertisment>) {
      state.listing = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setStatus(
      state,
      action: PayloadAction<"idle" | "loading" | "succeeded" | "failed">
    ) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListingInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchListingInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listing = action.payload;
      })
      .addCase(fetchListingInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch listing";
      });
  },
});

export const { setListing, setError, setStatus } = listingSlice.actions;

export default listingSlice.reducer;

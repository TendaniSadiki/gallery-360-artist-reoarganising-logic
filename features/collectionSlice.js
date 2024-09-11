import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  selectedArtworks: [],
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setSelectedArtworks: (state, action) => {
      //let selectedArtworks = [];
      state.selectedArtworks = [...state.selectedArtworks, action.payload];
    },
  },
});

export const { setSelectedArtworks } = collectionSlice.actions;

export default collectionSlice.reducer;

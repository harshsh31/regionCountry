import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      name: "Europe",
      region: "europe",
    },
    {
      name: "Asia",
      region: "asia",
    },
  ],
  selectedRegion: null,
};

const regionsSlice = createSlice({
  name: "regions",
  initialState,
  reducers: {
    setSelectedRegion(state, action) {
      state.selectedRegion = action.payload;
    },
  },
});

export const regionsActions = regionsSlice.actions;
export default regionsSlice.reducer;

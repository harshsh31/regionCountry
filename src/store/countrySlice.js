import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  selectedCountry: null,
  selectedCountryObject: {},
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountryList(state, action) {
      state.list = action.payload;
    },
    setSelectedCountry(state, action) {
      state.selectedCountry = action.payload;
    },
    setSelectedCountryObject(state, action) {
      state.selectedCountryObject = action.payload;
    },
  },
});

export const countryActions = countrySlice.actions;
export default countrySlice.reducer;

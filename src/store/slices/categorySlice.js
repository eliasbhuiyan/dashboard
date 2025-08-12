import {  createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: JSON.parse(localStorage.getItem("category")) || null,
  },
  reducers: {
    categories: (state, actions) => {
      state.categories = actions.payload;
      localStorage.setItem("category", JSON.stringify(actions.payload))
    },
  },
});

export const { categories } = categorySlice.actions;
export default categorySlice.reducer;
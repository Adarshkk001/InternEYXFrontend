import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk("items/", async (options) => {
  return await axios
    .get(
      options.query
        ? `https://dummyjson.com/products/search?q=${options.query}&limit=${options.limit}&skip=${options.skip}`
        : `https://dummyjson.com/products?limit=${options.limit}&skip=${options.skip}`
    )
    .then((res) => {
      localStorage.setItem(`items-${options.skip}`, JSON.stringify(res.data));
      return res.data;
    })
    .catch((err) => {
      return JSON.parse(localStorage.getItem(`items-${options.skip}`));
    });
});

const initialState = {
  loading: false,
  items: "",
  total: 0,
  error: "",
};
const itemsSlice = createSlice({
  name: "items",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.products;
      state.total = action.payload.total;
      // console.log("Item slice:", action.payload);
      state.error = "";
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.items = "";
      state.total = 0;
      state.error = action.error;
      // console.log("Error:", action.payload);
    });
  },
});

export default itemsSlice.reducer;

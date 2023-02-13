import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPersonalItems = createAsyncThunk(
  "items/",
  async (options) => {
    if (options.query) console.log(options.query);
    return await axios
      .get(
        options.query
          ? `https://dummyjson.com/products/search?q=${options.query}&limit=${options.limit}&skip=${options.skip}`
          : `https://dummyjson.com/products?limit=${options.limit}&skip=${options.skip}`
      )
      .then((res) => {
        return res.data;
      });
  }
);

const initialState = {
  loading: false,
  items: "",
  error: "",
};
const itemsSlice = createSlice({
  name: "items",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPersonalItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPersonalItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.products;
      // console.log("Item slice:", action.payload);
      state.error = "";
    });
    builder.addCase(fetchPersonalItems.rejected, (state, action) => {
      state.loading = false;
      state.items = "";
      state.error = action.error;
    });
  },
});

export default itemsSlice.reducer;

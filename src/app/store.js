import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import itemsReducer from "../features/items/itemsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
  },
});

export default store;

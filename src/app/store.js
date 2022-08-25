import { configureStore } from "@reduxjs/toolkit";
import tradeReducer from "../features/tradeSlice";

const store = configureStore({
  reducer: {
    trade: tradeReducer,
  },
});

export default store;
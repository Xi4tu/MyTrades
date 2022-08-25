import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trades: null
};

const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    setTrades: (state, action) => {
      state.trades = action.payload.trades;
    }
  },
});


  

export const { setTrades} = tradeSlice.actions;
export const selectTrades = (state) => state.trade.trades;
export const selectDetails = (state) => state.trade.details;

export default tradeSlice.reducer;
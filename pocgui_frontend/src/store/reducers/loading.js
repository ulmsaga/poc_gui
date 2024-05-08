import { createSlice } from "@reduxjs/toolkit";

const loading = createSlice({
  name: 'loading',
  initialState: {
    isShow: false,
  },
  reducers: {
    startLoad: (state, action) => {
      state.isShow = true;
    },
    endLoad: (state, action) => {
      state.isShow = false;
    }
  }
});

export const isShow = (state) => state.isShow;
export const { startLoad, endLoad } = loading.actions;
export default loading.reducer;
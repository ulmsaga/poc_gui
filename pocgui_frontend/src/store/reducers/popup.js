import { createSlice } from "@reduxjs/toolkit";

const popup = createSlice({
  name: 'popup',
  initialState: {
    isShowPopup: false,
  },
  reducers: {
    openPopup: (state, action) => {
      state.isShowPopup = true;
    },
    closePopup: (state, action) => {
      state.isShowPopup = false;
    }
  }
});

export const isShow = (state) => state.isShowPopup;
export const { openPopup, closePopup } = popup.actions;
export default popup.reducer;
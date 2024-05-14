import { createSlice } from '@reduxjs/toolkit'

const message = createSlice ({
  name: 'message',
  initialState: {
    isShow: false,
    type: 'alert',
    size: 'medium',  // 'small', 'medium', 'large'
    title: '',
    msg: '',
    callback: null
  },
  reducers: {
    alertMsg: (state, action) => {
      state.type = 'alert';
      state.size = 'medium';
      state.title = action.payload.title;
      state.msg = action.payload.msg;
      state.isShow = true;
    },
    confirmMsg: (state, action) => {
      state.type = 'confirm';
      state.size = 'medium';
      state.title = action.payload.title;
      state.msg = action.payload.msg;
      state.callback = action.payload.callback;
      state.isShow = true;
    },
    closeAlert: (state, action) => {
      state.isShow = false
      state.type = ''
      state.size = '';
      state.title = ''
      state.msg = ''
      state.callback = null
    },
    initMsg: (state) => {
      state.isShow = false
      state.type = 'alert'
      state.size = 'medium';
      state.title = '알림'
      state.msg = ''
      state.callback = null
    }
  }
})

export const callback = (state) => state.callback;
export const title = (state) => state.title;
export const msg = (state) => state.msg;
export const type = (state) => state.type;
export const size = (state) => state.size;
export const isShow = (state) => state.isShow;

export const { alertMsg, confirmMsg, closeAlert, initMsg } = message.actions;

export default message.reducer
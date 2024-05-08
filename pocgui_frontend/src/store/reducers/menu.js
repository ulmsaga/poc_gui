import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserMenuInfoList } from 'api/login/loginApi';

export const fetchMenuListById = createAsyncThunk (
  'menu/fetchByIdStatus',
  async (_, { getState }) => {
    const { user } = getState();
    // const response = await getUserMenuInfoList({userId: user.id});
    const response = await getUserMenuInfoList({userId: user.id});
    return response.data;
  }
);

const initialState = {
  list: [],
  currentMenuInfo: {
    menu_code: '',
    menu_name: '',
    menu_navigation: '',
    menu_location: '',
    default_menu_yn: '',
    module_id: '',
    module_name: '',
    module_desc: '',
    role_id: '',
    role_name: '',
    role_desc: '',
    allow_use_auth: '',
    allow_read_auth: '',
    allow_create_auth: '',
    allow_modify_auth: '',
    allow_delete_auth: '',
    allow_confirm_auth: '',
    allow_func01_auth: '',
    allow_func02_auth: '',
    allow_func03_auth: '',
    allow_func04_auth: '',
    allow_func05_auth: '',
    allow_func06_auth: '',
    allow_func07_auth: '',
    allow_func08_auth: '',
    allow_func09_auth: '',
    allow_func10_auth: '',
  }
};

const menu = createSlice ({
  name: 'menu',
  initialState,
  reducers: {
    setCurrentMenuInfo: (state, action) => {
      state.currentMenuInfo.menu_code = action.payload.menu_code
      state.currentMenuInfo.menu_name = action.payload.menu_name
      state.currentMenuInfo.menu_navigation = action.payload.menu_navigation
      state.currentMenuInfo.menu_location = action.payload.menu_location
      state.currentMenuInfo.default_menu_yn = action.payload.default_menu_yn
      state.currentMenuInfo.module_id = action.payload.module_id
      state.currentMenuInfo.module_name = action.payload.module_name
      state.currentMenuInfo.module_desc = action.payload.module_desc
      state.currentMenuInfo.role_id = action.payload.role_id
      state.currentMenuInfo.role_name = action.payload.role_name
      state.currentMenuInfo.role_desc = action.payload.role_desc
      state.currentMenuInfo.allow_use_auth = action.payload.allow_use_auth
      state.currentMenuInfo.allow_read_auth = action.payload.allow_read_auth
      state.currentMenuInfo.allow_create_auth = action.payload.allow_create_auth
      state.currentMenuInfo.allow_modify_auth = action.payload.allow_modify_auth
      state.currentMenuInfo.allow_delete_auth = action.payload.allow_delete_auth
      state.currentMenuInfo.allow_confirm_auth = action.payload.allow_confirm_auth
      state.currentMenuInfo.allow_func01_auth = action.payload.allow_func01_auth
      state.currentMenuInfo.allow_func02_auth = action.payload.allow_func02_auth
      state.currentMenuInfo.allow_func03_auth = action.payload.allow_func03_auth
      state.currentMenuInfo.allow_func04_auth = action.payload.allow_func04_auth
      state.currentMenuInfo.allow_func05_auth = action.payload.allow_func05_auth
      state.currentMenuInfo.allow_func06_auth = action.payload.allow_func06_auth
      state.currentMenuInfo.allow_func07_auth = action.payload.allow_func07_auth
      state.currentMenuInfo.allow_func08_auth = action.payload.allow_func08_auth
      state.currentMenuInfo.allow_func09_auth = action.payload.allow_func09_auth
      state.currentMenuInfo.menu_lallow_func10_authocation = action.payload.allow_func10_auth
    },
    initMenuInfo: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMenuListById.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        if (action.payload.rs !== undefined) {
          state.list = action.payload.rs;
        }
      }
    })
  }
});

export const { setCurrentMenuInfo, initMenuInfo } = menu.actions;
export const currentMenuInfo = (state) => state.menu.currentMenuInfo;
export default menu.reducer;
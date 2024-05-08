import { createSlice } from '@reduxjs/toolkit'

const initialState = {id: '', name: '', user_role_list: []}

const user = createSlice ({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload.user_id
      state.name = action.payload.user_name
      state.roles = action.payload.user_role_list
    },
    initUserInfo: () => initialState
  }
})

export const { setUserInfo, initUserInfo } = user.actions
export const userName = (state) => state.user.name
export const userInfo = (state) => state.user

export default user.reducer

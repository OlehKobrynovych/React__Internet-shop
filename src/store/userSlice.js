import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  shop: {},
  isNeedUpdate: false,

}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setShop: (state, action) => {
      state.shop = action.payload;
    },
    setIsNeedUpdate: (state, action) => {
      state.isNeedUpdate = action.payload;
    },
  },
})

export const { setUser, setShop, setIsNeedUpdate } = userSlice.actions

export default userSlice.reducer
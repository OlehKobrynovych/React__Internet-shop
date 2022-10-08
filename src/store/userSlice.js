import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  shop: {},
  categories: [],
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
    getCategories: (state, action) => {
      state.categories = [...action.payload];
    },
    setCategories: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
    setIsNeedUpdate: (state, action) => {
      state.isNeedUpdate = action.payload;
    },
  },
})

export const { setUser, setShop, getCategories, setCategories, setIsNeedUpdate } = userSlice.actions

export default userSlice.reducer
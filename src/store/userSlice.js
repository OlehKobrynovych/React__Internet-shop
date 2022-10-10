import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  shop: {},
  categories: [],
  isNeedUpdateShop: false,
  isNeedUpdateCategories: false,
  isCleanInput: false,
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
    setIsNeedUpdateShop: (state, action) => {
      state.isNeedUpdateShop = action.payload;
    },
    setIsNeedUpdateCategories: (state, action) => {
      state.isNeedUpdateCategories = action.payload;
    },
    setIsCleanInput: (state, action) => {
      state.isCleanInput = action.payload;
    },
  },
})

export const { setUser, setShop, getCategories, setCategories, setIsNeedUpdateShop, setIsNeedUpdateCategories, setIsCleanInput } = userSlice.actions

export default userSlice.reducer
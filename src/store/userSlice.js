import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  shop: {},
  categories: [],
  products: [],
  editProduct: {},
  isNeedCreateShop: false,
  isNeedUpdateShop: false,
  isNeedUpdateCategories: false,
  isNeedUpdateProducts: false,
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
    getProducts: (state, action) => {
      state.products = [...action.payload];
    },
    setCategories: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
    setEditProduct: (state, action) => {
      state.editProduct = action.payload;
    },
    setIsNeedCreateShop: (state, action) => {
      state.isNeedCreateShop = action.payload;
    },
    setIsNeedUpdateShop: (state, action) => {
      state.isNeedUpdateShop = action.payload;
    },
    setIsNeedUpdateCategories: (state, action) => {
      state.isNeedUpdateCategories = action.payload;
    },
    setIsNeedUpdateProducts: (state, action) => {
      state.isNeedUpdateProducts = action.payload;
    },
    setIsCleanInput: (state, action) => {
      state.isCleanInput = action.payload;
    },
  },
})

export const { setUser, setShop, getCategories, getProducts, setCategories, setEditProduct, setIsNeedCreateShop, setIsNeedUpdateShop, setIsNeedUpdateCategories, setIsNeedUpdateProducts, setIsCleanInput } = userSlice.actions

export default userSlice.reducer
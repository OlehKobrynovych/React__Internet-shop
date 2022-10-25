import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  datas: {},
  products: [],
  categories: [],
  shop: {},
  selectedLanguage: {},
  selectedSubCategories: [],
  lastViewProduct: [],
  favoriteProduct: [],
  shoppingProduct: [],
  isOpenMenu: false,
  searchProductsName: '',
}

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    getDatas: (state, action) => {
      state.datas = action.payload;
    },
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setShop: (state, action) => {
      state.shop = action.payload;
    },
    setSelectedSubCategories: (state, action) => {
      state.selectedSubCategories = action.payload;
    },
    setLastViewProduct: (state, action) => {
      if (state.lastViewProduct.length == 3) {
        if(!state.lastViewProduct.find(el => el._id == action.payload._id)) {
          state.lastViewProduct = [... state.lastViewProduct.slice(1,3), action.payload]
        } 
      } else {
        if (!state.lastViewProduct.find(el => el._id == action.payload._id)) {
          state.lastViewProduct = [...state.lastViewProduct, action.payload];
        }
      }
    },
    setIsOpenMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
    setFavoriteProduct: (state, action) => {
      state.favoriteProduct = action.payload;
    },
    setShoppingProduct: (state, action) => {
      state.shoppingProduct = action.payload;
    },
    setSearchProductsName: (state, action) => {
      state.searchProductsName = action.payload;
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

export const { getDatas, getProducts, setShop, setCategories, setLastViewProduct, setSelectedSubCategories, setIsOpenMenu, setFavoriteProduct, setShoppingProduct, setSelectedLanguage, setSearchProductsName } = homeSlice.actions

export default homeSlice.reducer
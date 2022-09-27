import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  datas: {},
  selectedLanguage: {},
  selectedCategory: '',
  selectedSubCategories: [],
  lastViewProduct: [],
  favoriteProduct: [],
  shoppingProduct: [],
  isOpenMenu: false,
  // totalPrice: {},
}

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    getDatas: (state, action) => {
      state.datas = action.payload;
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSubCategories: (state, action) => {
      state.selectedSubCategories = action.payload;
    },
    setLastViewProduct: (state, action) => {
      if (state.lastViewProduct.length == 3) {
        if(state.lastViewProduct.find(el => el.id == action.payload.id)) {
          
        } else {
          state.lastViewProduct = [... state.lastViewProduct.slice(1,3), action.payload]
        }
      } else {
        state.lastViewProduct = [...state.lastViewProduct, action.payload];
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
    // setTotalPrice: (state, action) => {
    //   state.totalPrice = action.payload;
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

export const { getDatas, setSelectedCategory, setLastViewProduct, setSelectedSubCategories, setIsOpenMenu, setFavoriteProduct, setShoppingProduct, setSelectedLanguage } = homeSlice.actions

export default homeSlice.reducer
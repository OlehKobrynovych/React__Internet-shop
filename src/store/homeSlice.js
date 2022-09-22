import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  datas: {},
  selectedCategory: '',
  selectedSubCategories: [],
  // lastViewProduct: null,
  lastViewProduct: [],
  isOpenMenu: false,
}

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    getDatas: (state, action) => {
      state.datas = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSubCategories: (state, action) => {
      state.selectedSubCategories = action.payload;
    },
    setLastViewProduct: (state, action) => {
      if (state.lastViewProduct.length >= 3) {
        state.lastViewProduct = [... state.lastViewProduct.slice(1,3), action.payload]
      } else {
        state.lastViewProduct = [...state.lastViewProduct, action.payload];
      }
    },
    setIsOpenMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

export const { getDatas, setSelectedCategory, setLastViewProduct, setSelectedSubCategories, setIsOpenMenu } = homeSlice.actions

export default homeSlice.reducer
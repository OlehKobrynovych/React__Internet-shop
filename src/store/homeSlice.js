import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  datas: {},
  selectedCategory: '',
  selectedSubCategories: [],
  lastViewProduct: null,
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
      state.lastViewProduct = action.payload;
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

export const { getDatas, setSelectedCategory, setLastViewProduct, setSelectedSubCategories } = homeSlice.actions

export default homeSlice.reducer
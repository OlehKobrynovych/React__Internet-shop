import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  datas: {},
  selectedCategory: '',
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
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

export const { getDatas, setSelectedCategory } = homeSlice.actions

export default homeSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  shop: {},
  categories: [],
  products: [],
  purchases: [],
  editProduct: {},
  isNeedCreateShop: false,
  isNeedUpdateShop: false,
  isNeedUpdateCategories: false,
  // isNeedUpdateProducts: false,
  isCleanInput: false,
  // userLanguage: 'UA',
  selectedLanguage: {}
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
      state.categories = action.payload;
    },
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getPurchases: (state, action) => {
      state.purchases = action.payload;
    },
    setStatusPurchases: (state, action) => {
      state.purchases = state.purchases.map(el => {
        if (el._id == action.payload._id) {
          el.status = action.payload.status
        } 
        return el
      });
    },
    setSeenPurchases: (state, action) => {
      state.purchases = state.purchases.map(el => {
        if (el._id == action.payload._id) {
          el.isSeen = true
        } 
        return el
      });
    },
    setFavoritePurchases: (state, action) => {
      state.purchases = state.purchases.map(el => {
        if (el._id == action.payload._id) {
          el.favorite = action.payload.favorite
        } 
        return el
      });
    },
    setCategories: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
    setSubCategories: (state, action) => {
      state.categories = state.categories.map(el => {
        if (el._id == action.payload.parent_id) {
          el.sub_categories.push(action.payload)
        }
        return el
      });
    },
    setUpdataCategory: (state, action) => {
      if (action.payload.parent_id == "null") {
        state.categories = state.categories.map(el => {
          if (el._id == action.payload._id) {
            el = action.payload
          }
          return el
        })
      } else {
        state.categories = state.categories.map(el => {
          el.sub_categories =  el.sub_categories.map(ell => {
            if (ell._id == action.payload._id) {
              ell = action.payload
            }
            return ell
           })
          return el
        })
      }
    },
    setRemoveCategory: (state, action) => {
      state.categories = state.categories.filter(el => el._id !== action.payload);
    },
    setRemoveSubCategory: (state, action) => {
      state.categories = state.categories.map(el => {
        if (el._id == action.payload.categoryId) {
          el.sub_categories = el.sub_categories.filter(subCategories => subCategories._id !== action.payload.subCategoryId)
        } 
        return el
      });
    },
    setProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    setUpdataProduct: (state, action) => {
      state.products = [...state.products.map(el => {
        if (el._id == action.payload._id) {
          el = action.payload
        }
        return el
      })];
    },
    setEditProduct: (state, action) => {
      state.editProduct = action.payload;
    },
    setRemoveProduct: (state, action) => {
      state.products = state.products.filter(el => el._id !== action.payload);
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
    setIsCleanInput: (state, action) => {
      state.isCleanInput = action.payload;
    },
    // setUserLanguage: (state, action) => {
    //   state.userLanguage = action.payload;
    // },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
  },
})

export const { setUser, setShop, getCategories, getProducts, getPurchases, setStatusPurchases, setFavoritePurchases, setSeenPurchases,  setProduct, setUpdataProduct, setCategories, setUpdataCategory, setRemoveCategory, setSubCategories, setRemoveSubCategory, setEditProduct, setRemoveProduct, setIsNeedCreateShop, setIsNeedUpdateShop, setIsNeedUpdateCategories, setIsCleanInput, setUserLanguage, setSelectedLanguage } = userSlice.actions

export default userSlice.reducer
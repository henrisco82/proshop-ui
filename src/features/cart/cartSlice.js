import { createSlice } from '@reduxjs/toolkit'

const cartItems = JSON.parse(localStorage.getItem('cartItems'))
const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'))
const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'))

const initialState = {
    cartItems: cartItems ? cartItems : [],
    shippingAddress: shippingAddress ? shippingAddress : {},
    paymentMethod: paymentMethod ? paymentMethod : '',
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, name, image, price, countInStock, qty } = action.payload;
      const existingItem = state.cartItems.find((item) => item.product === product);

      if (existingItem) {
        const updatedCartItems = state.cartItems.map((item) =>
          item.product === product ? { ...item, qty } : item
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return {
          ...state,
          cartItems: updatedCartItems
        };
      } else {
        const newCartItems = [...state.cartItems, { product, name, image, price, countInStock, qty }];
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        return {
          ...state,
          cartItems: newCartItems
        };
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.product !== action.payload)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress))
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod))
    },
    clearCartItems: (state) => {
      state.cartItems = []
      localStorage.removeItem('cartItems')
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  updateQuantity,
} = cartSlice.actions

export default cartSlice.reducer

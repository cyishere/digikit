import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  // { ...product, qty: 0 }
];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCart: (state, action) => {
      state.push(action.payload);
    },
    addToCart: (state, action) => {
      // `action.payload` is the { product: {}, qty: ? }
      const { product, qty } = action.payload;

      let productAlreadyInCart = false;

      if (state.length > 0) {
        state.forEach((item) => {
          if (item.id === product.id) {
            item.qty += qty;

            productAlreadyInCart = true;
          }
        });
      }

      if (!productAlreadyInCart) {
        state.push({ ...product, qty });
      }

      localStorage.setItem("digicart", JSON.stringify(state));
    },
    // TODO update qty `updateCart`
    // TODO remove item from cart
  },
});

export const { initCart, addToCart } = cartSlice.actions;
export default cartSlice.reducer;

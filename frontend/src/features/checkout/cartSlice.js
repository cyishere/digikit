import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    // { ...product, qty: 0 }
  ],
  subtotal: 0,
  shippingFee: 5,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCart: (state, action) => {
      state.products.push(...action.payload);
      state.products.forEach((item) => {
        state.subtotal += item.price * item.qty;
      });
      state.total = state.subtotal + state.shippingFee;
    },
    addToCart: (state, action) => {
      // `action.payload` is the { product: {}, qty: ? }
      const { product, qty } = action.payload;

      let productAlreadyInCart = false;

      if (state.products.length > 0) {
        state.products.forEach((item) => {
          if (item.id === product.id) {
            item.qty += qty;

            productAlreadyInCart = true;
          }
          state.subtotal += item.price * item.qty;
        });
      }

      if (!productAlreadyInCart) {
        state.products.push({ ...product, qty });
        state.subtotal += qty * product.price;
      }

      state.total = state.subtotal + state.shippingFee;
      localStorage.setItem("digiCart", JSON.stringify(state.products));
    },
    // TODO update qty `updateCart`
    // TODO remove item from cart
  },
});

export const { initCart, addToCart } = cartSlice.actions;
export default cartSlice.reducer;

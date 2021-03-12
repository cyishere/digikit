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
    updateQty: (state, action) => {
      // `action.payload` is { productId, newQty }
      const { productId, newQty } = action.payload;

      let price = null;
      let diffQty = null;

      state.products.forEach((product) => {
        if (product.id === productId) {
          price = product.price;
          diffQty = newQty - product.qty;
          product.qty = newQty;
        }
      });

      state.subtotal = state.subtotal + price * diffQty;
      state.total += price * diffQty;

      localStorage.setItem("digiCart", JSON.stringify(state.products));
    },
    removeFromCart: (state, action) => {
      // `action.payload` is { id, price, qty }

      const { id, price, qty } = action.payload;

      state.products = state.products.filter((product) => product.id !== id);

      state.subtotal -= price * qty;

      state.total -= price * qty;

      localStorage.setItem("digiCart", JSON.stringify(state.products));
    },
    clearCart: (state, action) => {
      state.products = [];
      state.subtotal = 0;
      state.total = 0;
      localStorage.removeItem("digiCart");
    },
  },
});

export const {
  initCart,
  addToCart,
  updateQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// TODO selectors: productIds

import { createSlice } from "@reduxjs/toolkit";
import UpdataCart from "../../utils/cartUtils.js";
// Ensure initialState is an object with cartItems
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "Stripe" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const Item = action.payload;
      const exists = state.cartItems.find((product) => product._id === Item._id);

      if (exists) {
        // Merge qty: add new qty on top of existing qty, cap at available stock
        state.cartItems = state.cartItems.map((product) =>
          product._id === Item._id
            ? { ...product, qty: Math.min(product.qty + Item.qty, Item.countInStock) }
            : product
        );
      } else {
        state.cartItems = [...state.cartItems, Item];
      }

      UpdataCart(state);
    },

    RemoveFromCart: (state,action)=>{
       const product_id = action.payload;
       state.cartItems = state.cartItems.filter((item)=>item._id!=product_id);//Here we are just taking id from the payload
       
       UpdataCart(state);
    },

    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      UpdataCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      UpdataCart(state);
    },

    // Used by CartScreen dropdown: SET the qty directly (not accumulate)
    updateCartQty: (state, action) => {
      const { id, qty } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item._id === id ? { ...item, qty } : item
      );
      UpdataCart(state);
    },

    EmptyCart : (state)=>{
      state.cartItems = [];
      UpdataCart(state);
    },

    // Clears shipping address and payment method on logout,
    // but keeps cartItems so the user can continue shopping after logging back in.
    clearCheckoutData: (state) => {
      state.shippingAddress = {};
      state.paymentMethod = "Stripe";
      UpdataCart(state);
    },
  },
});

export const { addToCart, RemoveFromCart, updateCartQty, setShippingAddress, savePaymentMethod, EmptyCart, clearCheckoutData } = cartSlice.actions;
export default cartSlice.reducer;

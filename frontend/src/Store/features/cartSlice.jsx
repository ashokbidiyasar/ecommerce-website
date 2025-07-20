import { createSlice } from "@reduxjs/toolkit";
import UpdataCart from "../../utils/cartUtils.js";
// Ensure initialState is an object with cartItems
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [],shippingAddress : {},PaymentMethod : "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const Item = action.payload;
      const exists = state.cartItems.find((product) => product._id === Item._id);

      if (exists) {
        state.cartItems = state.cartItems.map((product) => (product._id === Item._id ? Item : product));
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
      state.PaymentMethod = action.payload;
      UpdataCart(state);
    },

    EmptyCart : (state,action)=>{
      state.cartItems = [];
      UpdataCart(state);
    }
  },
});

export const { addToCart, RemoveFromCart,setShippingAddress,savePaymentMethod,EmptyCart } = cartSlice.actions;
export default cartSlice.reducer;

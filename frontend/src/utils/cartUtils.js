const addNumber = (price) => {
  return Number((Math.round(price * 100) / 100).toFixed(2));
};

const UpdataCart = (state) =>{
  // Item cost
  state.itemPrice = addNumber(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

  // Shipping cost
  state.shippingPrice = addNumber(state.itemPrice > 500 ? 0 : 40);

  // Tax (18%)
  state.taxPrice = addNumber(state.itemPrice * 0.18);

  // Total cost
  state.totalPrice = addNumber(state.itemPrice + state.shippingPrice + state.taxPrice);

  // Persist to localStorage
  localStorage.setItem("cart", JSON.stringify(state));
}

export { addNumber };
export default UpdataCart;
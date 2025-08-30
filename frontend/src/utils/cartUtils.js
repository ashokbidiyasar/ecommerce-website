const addNumber = (price) => {
  return Number((Math.round(price * 100) / 100).toFixed(2));
};

const UpdataCart = (state) => {
  // Items total
  state.itemsPrice = addNumber(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Shipping cost
  state.shippingPrice = addNumber(state.itemsPrice > 500 ? 0 : 40);

  // Tax (18%)
  state.taxPrice = addNumber(state.itemsPrice * 0.18);

  // Total cost
  state.totalPrice = addNumber(
    state.itemsPrice + state.shippingPrice + state.taxPrice
  );

  // Persist to localStorage
  localStorage.setItem("cart", JSON.stringify(state));
};

export { addNumber };
export default UpdataCart;

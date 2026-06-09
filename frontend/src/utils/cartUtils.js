const addNumber = (price) => {
  return Number((Math.round(price * 100) / 100).toFixed(2));
};

const UpdataCart = (state) => {
  // Items total
  state.itemsPrice = addNumber(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Shipping: free if itemsPrice > 100, else $10 — matches backend calcPrices.js
  state.shippingPrice = addNumber(state.itemsPrice > 100 ? 0 : 10);

  // Tax: 15% — matches backend calcPrices.js
  state.taxPrice = addNumber(state.itemsPrice * 0.15);

  // Total cost
  state.totalPrice = addNumber(
    state.itemsPrice + state.shippingPrice + state.taxPrice
  );

  // Persist to localStorage
  localStorage.setItem("cart", JSON.stringify(state));
};

export { addNumber };
export default UpdataCart;

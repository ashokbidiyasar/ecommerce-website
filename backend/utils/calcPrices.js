function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

export function calcPrices(orderItems) {
  // Calculate items price safely (work in cents to avoid float issues)
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // Shipping: free if items > 100, else 10
  const shippingPrice = itemsPrice > 100 ? 0 : 10;

  // Tax: 15%
  const taxPrice = 0.15 * itemsPrice;

  // Total
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return {
    itemsPrice: addDecimals(itemsPrice),
    shippingPrice: addDecimals(shippingPrice),
    taxPrice: addDecimals(taxPrice),
    totalPrice: addDecimals(totalPrice),
  };
}

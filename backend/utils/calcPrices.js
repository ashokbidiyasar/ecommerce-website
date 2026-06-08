// #12 fix: toFixed(2) returns a string — wrap with parseFloat to ensure a proper Number is returned.
// Without this, prices like itemsPrice, taxPrice etc. would be strings, causing silent coercion
// bugs in arithmetic (e.g. Stripe's totalPrice * 100) and Mongoose Number field validation.
function addDecimals(num) {
  return parseFloat((Math.round(num * 100) / 100).toFixed(2));
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

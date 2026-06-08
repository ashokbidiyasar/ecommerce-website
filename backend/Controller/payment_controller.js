import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import asyncHandler from "../Middleware/asyncHandler.js";
import OrderModel from "../Models/OrderModel.js";
import { calcPrices } from "../utils/calcPrices.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const payment = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  // ✅ Always fetch the latest order from DB
  const order = await OrderModel.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // ✅ Calculate fresh prices from DB items
  const prices = calcPrices(order.orderItems);

  // Stripe requires cents (integer)
  const totalInCents = Math.round(prices.totalPrice * 100);

  // ✅ Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: order.orderItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100), // cents
      },
      quantity: item.qty,
    })),
    success_url: `${process.env.CLIENT_URL}/orders/${orderId}?success=true`,
    cancel_url: `${process.env.CLIENT_URL}/orders/${orderId}?canceled=true`,
  });

  // ✅ Update order with Stripe session + recalculated prices
  order.stripeSessionId = session.id;
  order.prices = prices;
  await order.save();

  // ✅ Send Stripe session URL to frontend
  res.json({ url: session.url });
});

export default payment;

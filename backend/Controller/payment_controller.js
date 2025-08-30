import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import OrderModel from "../Models/OrderModel.js";
import { calcPrices } from "../utils/calcPrices.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const payment = async (req, res) => {
  try {
    const { orderId } = req.params;

    // ✅ Always fetch the latest order from DB
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
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
    order.prices = prices; // optional, but keeps your backend in sync
    await order.save();

    // ✅ Send Stripe session URL to frontend
    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export default payment;

import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import express from "express";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import OrderModel from '../Models/OrderModel.js';
const payment = async (req, res) => {
  try {
    const { orderItems, totalPrice } = req.body;
    const { orderId } = req.params; // get orderId from URL
    console.log('orderId', orderId);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: orderItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      })),
      success_url: `${process.env.CLIENT_URL}/orders/${orderId}?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/orders/${orderId}?canceled=true`,
    });
    console.log('session url', session.url);

    res.json({ url: session.url });
  } catch (error) {
    console.error("Payment error: in the error of payment_controller", error);
    res.status(500).json({ message: error.message });
  }
};
export default payment;


import asyncHandler from "../Middleware/asyncHandler.js";
import OrderModel from "../Models/OrderModel.js";
import { calcPrices } from "../utils/calcPrices.js"; // ✅ always use backend calc

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await OrderModel.find({ user: req.user._id }).populate(
    "user",
    "name email"
  );

  if (!orders || orders.length === 0) {
    res.status(404);
    throw new Error("No orders found for this user");
  }

  res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.status(200).json(order);
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  // ✅ Calculate prices in backend
  const prices = calcPrices(orderItems);

  const createdOrder = await OrderModel.create({
    orderItems: orderItems.map((item) => ({
      ...item,
      product: item._id,
      _id: undefined, // avoid duplicate _id in subdocs
    })),
    shippingAddress,
    paymentMethod,
    ...prices, // ✅ itemsPrice, taxPrice, shippingPrice, totalPrice
    user: req.user._id,
  });

  res.status(201).json(createdOrder);
});

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const GetAllOrders = asyncHandler(async (req, res) => {
  const result = await OrderModel.find({}).populate("user", "name _id");

  if (!result || result.length === 0) {
    res.status(404);
    throw new Error("No orders found");
  }

  res.json(result);
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

export {
  getMyOrders,
  getOrderById,
  addOrderItems,
  GetAllOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
};

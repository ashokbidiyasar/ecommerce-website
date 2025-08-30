import express from "express";
const router = express.Router();

import {
  getMyOrders,
  getOrderById,
  addOrderItems,
  GetAllOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../Controller/order_controller.js";

import {
  Auth_protected,
  Admin_protected,
} from "../Middleware/Auth_protected.js";
import checkObjectId from "../Middleware/checkObjectId.js";

// @desc Get logged-in user's orders
router.get("/mine", Auth_protected, getMyOrders);

// @desc Get single order by ID
router.get("/:id", Auth_protected, checkObjectId, getOrderById);

// @desc Create new order
router.post("/", Auth_protected, addOrderItems);

// @desc Get all orders (Admin only)
router.get("/", Auth_protected, Admin_protected, GetAllOrders);

// @desc Update order to paid
router.put("/:id/pay", Auth_protected, checkObjectId, updateOrderToPaid);

// @desc Update order to delivered (Admin only)
router.put(
  "/:id/deliver",
  Auth_protected,
  Admin_protected,
  checkObjectId,
  updateOrderToDelivered
);

export default router;

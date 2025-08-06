import express from "express";
import  payment  from "../Controller/payment_controller.js";
import { Auth_protected } from "../Middleware/Auth_protected.js";

const router = express.Router();

// Pass orderId as URL param
router.post("/create-checkout-session/:orderId", Auth_protected, payment);

export default router;

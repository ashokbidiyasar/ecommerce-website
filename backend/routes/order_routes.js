import {
  getMyOrders,
  getOrderById,
  addOrderItems,
  GetAllOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../Controller/order_controller.js";


import express from 'express';
const router = express.Router();
import { Auth_protected, Admin_protected } from "../Middleware/Auth_protected.js";

router.get('/mine',Auth_protected,getMyOrders);
router.get('/:id',Auth_protected,getOrderById);
router.post('/',Auth_protected,addOrderItems);
router.get('/',Auth_protected,Admin_protected,GetAllOrders);
router.put('/:id/pay',Auth_protected,updateOrderToPaid);
router.put('/:id/deliver',Auth_protected,Admin_protected,updateOrderToDelivered);

export default router;
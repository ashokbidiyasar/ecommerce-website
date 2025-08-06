import express  from 'express';
import asyncHandler from '../Middleware/asyncHandler.js';;
import OrderModel from '../Models/OrderModel.js'

const getMyOrders=asyncHandler(async(req,res)=>{
    const orders = await OrderModel.find({user:req.user._id}).populate('user','name email');
    if(!orders || orders.length === 0){
        res.status(404);
        throw new Error('No orders found for this user');
    }
    res.status(200).json(orders);
})

const getOrderById=asyncHandler(async(req,res)=>{
    const order = await OrderModel.findById(req.params.id).populate('user','name email');
    if (!order || order.length === 0) {
      res.status(404);
      throw new Error("No orders found for this user");
    }
    res.status(200).json(order);
})

const addOrderItems=asyncHandler(async(req,res)=>{
    let { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No order items');
    }else{
       const createdOrder = await OrderModel.create({
         orderItems: orderItems.map((item) => ({
           ...item,
           product: item._id,
           _id: undefined,
         })),
         shippingAddress,
         paymentMethod,
         itemsPrice,
         taxPrice,
         shippingPrice,
         totalPrice,
         user: req.user._id,
       });


        res.status(201).json(createdOrder);
    }
})

const GetAllOrders = asyncHandler(async (req, res) => {
  const result = await OrderModel.find({}).populate("user", "name _id");

  if (result.length === 0) {
    res.status(404);
    throw new Error("No orders found");
  }

  console.log("All orders fetched");
  res.json(result);
});


const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});


const updateOrderToDelivered=asyncHandler(async(req,res)=>{
     const order = await OrderModel.findById(req.params.id);

     if (order) {
       order.isDelivered = true;
       order.deliveredAt = Date.now();

       const updatedOrder = await order.save();

       res.json(updatedOrder);
     } else {
       res.status(404);
       throw new Error("Order not found");
     }
})

export {
    getMyOrders,
    getOrderById,
    addOrderItems,
    GetAllOrders,
    updateOrderToDelivered,
    updateOrderToPaid
}

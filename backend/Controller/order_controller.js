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
    if (!orders || orders.length === 0) {
      res.status(404);
      throw new Error("No orders found for this user");
    }
    res.status(200).json(order);
})

const addOrderItems=asyncHandler(async(req,res)=>{
    let {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No order items');
    }else{
        const orders = new OrderModel({
             orderItems : orderItems.map((item)=>({
                   ...item,
                   product: item._id,
                   _id: undefined // Remove _id to avoid duplication because we do not need it in the orderitems
               }))
            ,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user: req.user._id
        })

        res.status(201).json(orders);
    }
})

const GetAllOrders=asyncHandler(async(req,res)=>{
    res.send('add order items');
})

const updateOrderToPaid=asyncHandler(async(req,res)=>{
    res.send('get order paid ');
})

const updateOrderToDelivered=asyncHandler(async(req,res)=>{
    res.send('get all user orders');
})

export {
    getMyOrders,
    getOrderById,
    addOrderItems,
    GetAllOrders,
    updateOrderToDelivered,
    updateOrderToPaid
}

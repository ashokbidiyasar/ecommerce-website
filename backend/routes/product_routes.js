import express from 'express';
import asyncHandler from '../Middleware/asynchandler.js';
const router = express.Router();
import ProductModel  from '../Models/ProductModel.js'

router.get('/',asyncHandler(async(req,res)=>{
    const products = await ProductModel.find({});
    return res.json(products);
}))

router.get("/:id",asyncHandler (async(req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if(product){
     return res.json(product);
  }else{
  res.status(404).json({error : "Product not found"});
  }
}));

export default router;
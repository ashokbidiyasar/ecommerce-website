import asyncHandler from "../Middleware/asyncHandler.js"
import ProductModel from "../Models/ProductModel.js";

const GetAllProduct = asyncHandler(async(req,res)=>{
    const products = await ProductModel.find({});
    return res.json(products);
})


const GetOneProduct = asyncHandler (async(req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if(product){
     return res.json(product);
  }else{
  res.status(404).json({error : "Product not found"});
  }
})

export { GetAllProduct, GetOneProduct };
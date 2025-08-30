import express from 'express';
const router = express.Router();
import ProductModel  from '../Models/ProductModel.js'
import {
  GetAllProduct,
  GetOneProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  createProductReview,
  getTopProducts
} from "../Controller/product_controller.js";
import { Auth_protected , Admin_protected} from '../Middleware/Auth_protected.js';

router.get("/top", getTopProducts);
router.get("/", GetAllProduct);
router.post('/',Auth_protected,Admin_protected,CreateProduct)
router.get("/:id",GetOneProduct);
router.put('/:id',Auth_protected,Admin_protected,UpdateProduct)
router.delete('/:id',Auth_protected,Admin_protected,DeleteProduct)
router.post('/:id/reviews',Auth_protected,createProductReview)


export default router;
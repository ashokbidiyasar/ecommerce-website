import express from 'express';
const router = express.Router();
import ProductModel  from '../Models/ProductModel.js'
import { GetAllProduct, GetOneProduct } from "../Controller/product_controller.js";
router.get("/", GetAllProduct);

router.get("/:id",GetOneProduct);

export default router;
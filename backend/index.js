import express, { urlencoded } from "express";
import products from "./products.js";
import ConnectDB from "./ConnectDB/ConnectDB.js";
import dotenv from "dotenv";
import product_router from "./routes/product_routes.js";
import user_router from "./routes/user_routes.js";
import { errorHandler } from "./Middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import order_router from './routes/order_routes.js';
import payment_router from './routes/payment_routes.js';
import cors from 'cors';
dotenv.config();
const app = express();
ConnectDB();



app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


app.use("/api/payment", payment_router);
app.use("/api/products", product_router);
app.use("/api/users", user_router);
app.use('/api/orders',order_router);

app.use(errorHandler);

app.listen(process.env.PORT, (req, res) => {
  console.log("Port is running fine");
});

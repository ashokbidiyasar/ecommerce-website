import express, { urlencoded } from "express";
import products from "./products.js";
import ConnectDB from "./ConnectDB/ConnectDB.js";
import { configDotenv } from "dotenv";
import product_router from "./routes/product_routes.js";
import user_router from "./routes/user_routes.js";
import { errorHandler } from "./Middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import order_router from './routes/order_routes.js';
configDotenv();
const app = express();
ConnectDB();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/products", product_router);
app.use("/api/users", user_router);
app.use('/api/orders',order_router);

app.use(errorHandler);

app.listen(process.env.PORT, (req, res) => {
  console.log("Port is running fine");
});

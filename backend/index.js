import path from "path";
import express, { urlencoded } from "express";
import products from "./products.js";
import ConnectDB from "./ConnectDB/ConnectDB.js";
import dotenv from "dotenv";
import product_router from "./routes/product_routes.js";
import user_router from "./routes/user_routes.js";
import { errorHandler } from "./Middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import order_router from "./routes/order_routes.js";
import payment_router from "./routes/payment_routes.js";
import UploadRoutes from "./routes/upload_routes.js";
import cors from "cors";

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
app.use("/api/orders", order_router);
app.use("/api/upload", UploadRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(errorHandler);

app.listen(process.env.PORT, (req, res) => {
  console.log("Port is running fine");
});

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

// DB Connection
ConnectDB();

// Middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// API Routes
app.use("/api/payment", payment_router);
app.use("/api/products", product_router);
app.use("/api/users", user_router);
app.use("/api/orders", order_router);
app.use("/api/upload", UploadRoutes);

// Production setup for Vite build
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  // Serve uploaded files
  app.use("/uploads", express.static("/var/data/uploads"));

  // ✅ Serve React build from Vite (dist folder)
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  const __dirname = path.resolve();

  // Local uploads
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

  // Default route in dev
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Error handler middleware
app.use(errorHandler);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

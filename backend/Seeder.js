import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import UserData from "./Userdata.js";
import products_data from "./products.js";
import UserModel from "./Models/UserModel.js";
import ProductModel from "./Models/ProductModel.js";
import OrderModel from "./Models/OrderModel.js";
import ConnectDB from "./ConnectDB/ConnectDB.js";

configDotenv();

ConnectDB();

const import_data = async () => {
  try {

    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    const createdUsers = await UserModel.insertMany(UserData);

    // Use the first user as admin for products
    const admin_user = createdUsers[0]._id;

    // Add admin reference to each product
    const sample_products = products_data.map((product) => ({
      ...product,
      user: admin_user,
    }));

    // Insert sample products
    await ProductModel.insertMany(sample_products);

    console.log(" Sample data imported successfully");
    process.exit(); // Exit script
  } catch (error) {
    console.error("Error in Seeder:", error);
    process.exit(1);
  }
};

// Function to destroy all data
const destroy_data = async () => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    console.log(" Data destroyed successfully");
    process.exit();
  } catch (error) {
    console.error(" Error in Destroy:", error);
    process.exit(1);
  }
};

// Check command-line argument
if (process.argv[2] === "-d") {
  destroy_data();
} else {
  import_data();
}

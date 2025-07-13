import express from 'express';
import products  from './products.js';
import ConnectDB from './ConnectDB/ConnectDB.js';
import { configDotenv } from 'dotenv';
import router from './routes/product_routes.js'
configDotenv();
const app = express();
ConnectDB();
app.use(express.json());
app.use("/api/products",router);
app.use("/api/products/:id", router);


app.listen(process.env.PORT,(req,res)=>{
    console.log("Port is running fine");
})

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const ConnectDB = async() =>{
    try {
        const connection = await mongoose.connect(String(process.env.MONGO_URI));
        if(connection){
            console.log("mogodb connected");
        }else{
            console.log("Error in connection");
        }
    } catch (error) {
        console.log("Error in mogodb connection",error);
    }
} 

export default ConnectDB
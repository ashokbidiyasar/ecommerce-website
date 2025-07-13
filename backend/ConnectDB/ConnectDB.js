
import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
configDotenv();


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
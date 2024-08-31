import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\n MongoDb connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB NOT CONNECTED", error);
        process.exit(1);
    }
};

export default connectDB;

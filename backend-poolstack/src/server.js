import dotenv from "dotenv";
import { app } from "./index.js";
import connectDB from "./config/db.js";

dotenv.config({
    path:"./.env"
}); 

const port = process.env.PORT || 5070; 

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log('Server is running at port:', port);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!!", err);
    });

import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// ROUTERS
import authRouter from "./routes/auth.route.js";
import userRouters from "./routes/user.route.js";
import adminProductRouter from "./routes/admin.product.route.js";
import productRouter from "./routes/user.product.route.js";
import cartRouter from "./routes/cart.route.js";
import cartItemRouter from "./routes/cartItem.route.js";
import orderRouter from "./routes/order.route.js";
import reviewRouter from "./routes/review.route.js";
// import adminOrderRouter from "./routes/adminOrderRoutes.js" implement korete hbe

app.use("/auth", authRouter);   //done checking
app.use("/api/users", userRouters); //done checking
app.use("/api/admin/products", adminProductRouter); //done cheking  
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/cart_Items", cartItemRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter); 
// app.use("/api/admin/orders", adminOrderRouter)

export { app };

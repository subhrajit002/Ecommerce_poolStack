import express from "express";
import orderController from "../controller/order.controller.js";
import authmiddlware from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/", authmiddlware, orderController.createOrder);
router.get("/user", authmiddlware, orderController.OrderHistory);
router.get("/:id", authmiddlware, orderController.findOrderById);

export default  router ;
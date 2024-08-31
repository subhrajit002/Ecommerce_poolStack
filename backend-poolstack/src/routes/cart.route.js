import express from "express";
import authmiddlware from "../middleware/auth.middleware.js"
import cartContoller from "../controller/cart.controller.js"

const router = express.Router();

router.get("/", authmiddlware, cartContoller.findUserCart);
router.put("/put", authmiddlware, cartContoller.addItemToCart)

export default router;
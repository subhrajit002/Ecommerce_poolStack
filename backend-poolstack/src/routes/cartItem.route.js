import express from "express";
import authmiddlware from "../middleware/auth.middleware.js"
import cartItemContoller from "../controller/cartItem.controller.js"

const router = express.Router();

router.put("/:id", authmiddlware, cartItemContoller.UpdateCartItem)
router.delete("/:id", authmiddlware, cartItemContoller.removeCartItem)

export default router;
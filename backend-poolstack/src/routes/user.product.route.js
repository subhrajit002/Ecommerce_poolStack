import express from "express";
import authmiddlware from "../middleware/auth.middleware.js";
import productController from "../controller/product.controller.js";

const router = express.Router();

router.get("/", authmiddlware, productController.getAllProducts);
router.get("/id/:id", authmiddlware, productController.findProductById);

export default router;
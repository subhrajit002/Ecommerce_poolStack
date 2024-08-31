import express from "express";
import authmiddlware from "../middleware/auth.middleware.js"
import productController from "../controller/product.controller.js"

const router = express.Router();

router.post("/", authmiddlware, productController.createProduct)
router.post("/creates", authmiddlware, productController.createMultipleProduct)
router.delete("/:id", authmiddlware, productController.deleteProduct)
router.put("/:id", authmiddlware, productController.updateProduct)

export default router;
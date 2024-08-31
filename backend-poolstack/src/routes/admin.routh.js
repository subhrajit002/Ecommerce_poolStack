import express from "express";
import adminController from "../controller/admin.controlers.js"
import authmiddlware from "../middleware/auth.middleware.js"


const router = express.Router();

router.get("/", authmiddlware, adminController.getAllOrders);
router.put("/:orderId/confirm", authmiddlware, adminController.confirmOrder);
router.put("/:orderId", authmiddlware, adminController.shipOder);
router.put("/:orderId/ship", authmiddlware, adminController.deliverOrder);
router.put("/:orderId/cancel", authmiddlware, adminController.cancelOrder);
router.delete("/:orderId/delete", authmiddlware, adminController.deleteOrder);

export default router;
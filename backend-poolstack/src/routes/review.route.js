import express from "express";
import authmiddlware from "../middleware/auth.middleware.js"
import reviewController from "../controller/review.controller.js"

const router = express.Router();

router.post("/create", authmiddlware, reviewController.createReview);
router.get("/product/product:id", authmiddlware, reviewController.getAllReviews);

export default router;
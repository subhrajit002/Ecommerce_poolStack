import reviewServices from "../services/review.services.js"

const createReview = async (req, res) => {
    try {
        const user = req.user;
        const review = await reviewServices.createReview(req.body);
        return res.status(201).json(review);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getAllReviews = async (req, res) => {
    try {
        const user = req.user;
        const productId = req.params.productId;
        const review = await reviewServices.getAllReviews(productId, req.body);
        return res.status(201).json(review);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export default { createReview, getAllReviews };
import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Review = mongoose.model("reviews", ReviewsSchema)
export default Review;
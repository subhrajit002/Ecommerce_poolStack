import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    cartItem: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartItems",
        required: true
    }],
    totalPrice: {
        type: Number,
        default: 0,
        required: true
    },
    totalItem: {
        type: Number,
        required: true,
        default: 0
    }
})

const Cart = mongoose.model("cart", cartSchema)
export default Cart;
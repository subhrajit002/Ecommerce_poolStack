import CartItem from "../models/cartItem.js";
import userServices from "./user.services.js";

const updateCartItem = async (userId, cartItemId, cartItemdData) => {
    try {
        const item = await findCartItemById(cartItemId);
        if (!item) {
            throw new Error("cart item not found ", cartItemId);
        }

        const user = await userServices.findUserById(item.userId);
        if (!user) {
            throw new Error("user not found ", userId);
        }

        if (user._id.toString() === userId.toString()) {
            item.quantity = cartItemdData.quantity;

            item.price = item.quantity * item.product.price;

            const updatedCartItem = await item.save();
            return updatedCartItem;
        } else {
            throw new Error("You cannot update this cart item");
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteCartItem = async (userId, cartItemId) => {
    try {
        const item = await findCartItemById(cartItemId);
        if (!item) {
            throw new Error(`item not found ${cartItemId}`);
        }

        const user = await userServices.findUserById(userId);
        if (!user) {
            throw new Error(`User not found ${userId}`);
        }

        if (user._id.toString() === item.userId.toString()) {
            return await CartItem.findByIdAndDelete(cartItemId);
        } else {
            throw new Error("you cannot remove the cart item");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const findCartItemById = async (cartItemId) => {
    try {
        const item = await CartItem.findById(cartItemId).populate("product");
        if (item) {
            return item;
        } else {
            throw new Error(`Item not found ${cartItemId}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export default { updateCartItem, deleteCartItem, findCartItemById }
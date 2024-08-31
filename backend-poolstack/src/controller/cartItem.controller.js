import cartItemService from "../services/cartItem.services.js";


const UpdateCartItem = async (req, res) => {
    try {
        const user = await req.user;
        const updatedCartItem = await cartItemService.updateCartItem(user._id, req.params.id, req.body)
        return res.status(200).send(updatedCartItem)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const removeCartItem = async (req, res) => {
    try {
        const user = req.user;
        await cartItemService.deleteCartItem(user._id, req.params.id);
        return res.status(200).send("Cart item removed successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export default { removeCartItem, UpdateCartItem }
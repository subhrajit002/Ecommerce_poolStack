import cartServices from "../services/cart.services.js";


const findUserCart = async (req, res) => {
    try {
        const user = req.user;
        const cart = await cartServices.findUserCart(user._id);
        return res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const addItemToCart = async (req, res) => {
    try {
        const user = req.user; // Assuming auth middleware populates req.user
        const result = await cartServices.addCartItems(user._id, req.body);
        return res.status(200).json(result); // Sends the response
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export default { findUserCart, addItemToCart };
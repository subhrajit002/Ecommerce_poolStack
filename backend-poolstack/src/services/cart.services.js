import Cart from "../models/cart.js";
import CartItem from "../models/cartItem.js";
import Product from "../models/product.js";

async function createCart(user) {
    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findUserCart(userId) {
    try {
        let cart = await Cart.findOne({ user: userId });
        let cartItems = await CartItem.find({ cart: cart._id }).populate("product");

        cart.cartItem = cartItems;

        let totalPrice = 0;
        let totalItems = 0;

        for (let cartItem of cart.cartItem) {
            totalPrice += cartItem.price;
            totalItems += cartItem.quantity;
        }

        cart.totalPrice = totalPrice;
        cart.totalItems = totalItems;

        return cart;

    } catch (error) {
        throw new Error(error.message);
    }
}


async function addCartItems(userId, { productId, size }) {
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) throw new Error('Cart not found');

        const product = await Product.findById(productId);
        if (!product) throw new Error('Product not found');

        const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId });

        let createdCartItem;
        if (!isPresent) {
            const addToCart = new CartItem({
                cart: cart._id,
                product: product._id,
                userId,
                quantity: 1,
                price: product.price,
                size
            });
            createdCartItem = await addToCart.save();
            cart.cartItem.push(createdCartItem);
            await cart.save();
        }
        return { message: "Item is added", cartItem: createdCartItem };
    } catch (error) {
        throw new Error(error.message);
    }
}

export default { createCart, findUserCart, addCartItems };
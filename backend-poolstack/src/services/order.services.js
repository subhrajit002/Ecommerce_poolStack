import Address from "../models/address.js";
import cartServices from "./cart.services.js";
import Order from "../models/order.js";
import OrderItem from "../models/orderItems.js";

const createOrder = async (user, shippingAddress) => {
    try {
        let address;
        if (shippingAddress._id) {
            address = await Address.findById(shippingAddress._id);
        } else {
            address = new Address(shippingAddress);
            address.user = user._id; // Use user._id to avoid circular reference
            await address.save();

            user.address.push(address._id); // Push only the address ID, not the entire object
            await user.save();
        }

        const cart = await cartServices.findUserCart(user._id);
        const orderItems = [];

        for (const item of cart.cartItem) {
            const orderItem = new OrderItem({
                price: item.price,
                product: item.product,
                quantity: item.quantity,
                size: item.size,
                userId: user._id // Use user._id instead of user
            });
            const createdOrderItem = await orderItem.save();
            orderItems.push(createdOrderItem);
        }

        const createdOrder = new Order({
            user: user._id, // Use user._id instead of user
            orderItems,
            shippingAddress: address._id, // Use address._id to avoid circular reference
            totalPrice: cart.totalPrice,
            totalItem: cart.totalItem
        });

        const savedOrder = await createdOrder.save();

        return savedOrder; // Return only the necessary data
    } catch (error) {
        console.error("Error in createOrder:", error.message);
        throw new Error(error.message);
    }
};

const placedOrder = async (orderId) => {
    try {
        const order = await findOrderById(order);

        if (order) {
            order.status = "PLACED";
            order.paymentDetails.status = "COMPLETED"
        }
        return await order.save()
    } catch (error) {
        throw new Error({ error: error.messsage("order is not placed something gone wrong") })
    }
}

const confirmOrder = async (orderId) => {
    try {
        const order = await findOrderById(order);

        if (order) {
            order.status = "CONFIRM";
            // order.paymentDetails.status = "completed"
        }
        return await order.save()
    } catch (error) {
        throw new Error({ error: error.messsage("order is not CONFIRM something gone wrong") })
    }
}

const shiftOrder = async (orderId) => {
    try {
        const order = await findOrderById(order);

        if (order) {
            order.status = "SHIFFTED";
            // order.paymentDetails.status = "completed"
        }
        return await order.save()
    } catch (error) {
        throw new Error({ error: error.messsage("order is not SHIFFTED something gone wrong") })
    }
}

const deliveredOrder = async (orderId) => {
    try {
        const order = await findOrderById(order);

        if (order) {
            order.status = "DELIVERED";
            // order.paymentDetails.status = "completed"
        }
        return await order.save()
    } catch (error) {
        throw new Error({ error: error.messsage("order is not DELIVERED something gone wrong") })
    }
}

const cancelledOrder = async (orderId) => {
    try {
        const order = await findOrderById(order);

        if (order) {
            order.status = "CANCELLED";
            // order.paymentDetails.status = "completed"
        }
        return await order.save()
    } catch (error) {
        throw new Error({ error: error.messsage("order is not CANCELLED something gone wrong") })
    }
}

const findOrderById = async (orderId) => {
    try {
        const order = await Order.findById(orderId)
            .populate("user")
            .populate({ path: "orderItems", populate: { path: "product" } })
            .populate("shippingAddress")

        return order
    } catch (error) {

    }
}

async function userOrderHistory(userId) {
    try {
        const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
            .populate({ path: "orderItems", populate: { path: "product" } }).lean()
        return orders;
    } catch (error) {
        throw new Error({ error: error.messsage })
    }
}

async function getAllOrders() {
    return await Order.find()
        .populate({ path: "orderItems", populate: { path: "product" } }).lean()
}

async function deleteOrder(orderId) {
    const order = await Order.findOrderById(orderId);
    await Order.findByIdAndDelete(orderId)
}

export default { createOrder, deleteOrder, getAllOrders, placedOrder, confirmOrder, shiftOrder, userOrderHistory, deliveredOrder, cancelledOrder };
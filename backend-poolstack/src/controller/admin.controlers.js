import orderServices from "../services/order.services.js";

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderServices.getAllOrders();
        return res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const confirmOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId
        const orders = await orderServices.confirmOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const shipOder = async (req, res) => {
    try {
        const orderId = req.params.orderId
        const orders = await orderServices.shipOder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deliverOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId
        const orders = await orderServices.deliveredOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId
        const orders = await orderServices.cancelledOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId
        const orders = await orderServices.deleteOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export default { deleteOrder, cancelOrder, deliverOrder, getAllOrders, shipOder, confirmOrder}

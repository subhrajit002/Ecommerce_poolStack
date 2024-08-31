import orderServices from "../services/order.services.js"

const createOrder = async (req, res) => {
    try {
        const user = req.user; // Assuming req.user is set by some middleware
        const createNewOrder = await orderServices.createOrder(user, req.body);

        return res.status(201).send(createNewOrder);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const findOrderById = async (req, res) => {
    try {
        const user = await req.user;

        const createNewOrder = await orderServices.findOrderById(req.params.id);

        res.status(201).send(createNewOrder);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const OrderHistory = async (req, res) => {
    try {
        const user = await req.user;

        const createNewOrder = await orderServices.userOrderHistory(req.params.id);

        res.status(201).send(createNewOrder);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export default { createOrder, findOrderById, OrderHistory };
import productService from "../services/product.services.js";

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        return res.status(201).json(product)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productService.deleteProduct(productId);
        return res.status(201).json(product)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productService.updateProduct(productId, req.body);
        return res.status(201).json(product)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const findProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productService.findProductById(productId);
        return res.status(201).json(product)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getAllProducts = async (req, res) => {
    try {
        
        const product = await productService.getAllProducts(req.query);
        return res.status(201).json(product)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const createMultipleProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productService.addMultipleProduct(req.body);
        return res.status(201).json("products created successfully")
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export default { createProduct, deleteProduct, updateProduct, getAllProducts, findProductById, createMultipleProduct }
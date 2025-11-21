const { executeBdActionAsync: executeAct, AppError } = require('./globalController');
const productsModel = require('../models/productsModel');

const getAllProducts = async (_request, response, next) => {
    try {
        const products = await executeAct(() => productsModel.getAllProducts());
        return response.status(200).json(products);
    } catch (err) {
        next(err);
    }
}

const getProduct = async (request, response, next) => {
    try {
        const { id } = request.params;
        const product = await executeAct(() => productsModel.getProduct(id));
        if (!product || Object.keys(product).length === 0)
            throw new AppError(`Produto não encontrado`, 404);
        return response.status(200).json(product);
    } catch (err) {
        next(err);
    }
}

const createProduct = async (request, response, next) => {
    try {
        const createdProduct = await executeAct(() => productsModel.createProduct(request.body));
         if (!createdProduct || Object.keys(createdProduct).length === 0)
            throw new AppError(`Produto não encontrado`, 404);
        return response.status(201).json(createdProduct);
    } catch (err) {
        next(err);
    }
}

const deleteProduct = async (request, response, next) => {
    const { id } = request.params;
    try {
        const returned = await executeAct(() => productsModel.deleteProduct(id));
        console.log(returned);
        if (!returned || Object.keys(returned).length === 0)
            throw new AppError(`Produto não encontrado`, 404);
        return response.status(204).json();
    } catch (err) {
        next(err);
    }
}

const updateProduct = async (request, response, next) => {
    const { id } = request.params;
    const body = request.body;
    try {
        const returned = await executeAct(() => productsModel.updateProduct(id, body));
        if (!returned || Object.keys(returned).length === 0)
            throw new AppError(`Produto não encontrada`, 404);
        return response.status(204).json();
    } catch (err) {
        next(err);
    }
}


module.exports = { getAllProducts, createProduct, deleteProduct, updateProduct, getProduct };

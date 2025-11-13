const productsModel = require('../models/productsModel');

const getAllProducts = async (_request, response) => {
    const products = await productsModel.getAllProducts();
    return response.status(200).json(products);
}

const createProduct = async (request, response) => {
    const createdProduct = await productsModel.createProduct(request.body);
    return response.status(201).json(createdProduct);
}

const deleteProduct = async(request, response) => {
    const { id } = request.params
    await productsModel.deleteProduct(id);
    return response.status(204).json();
}

const updateProduct = async (request, response) => {
    const { id } = request.params;
    const body  = request.body;

    await productsModel.updateProduct(id, body);
    return response.status(204).json();
}

module.exports = { getAllProducts, createProduct, deleteProduct , updateProduct};
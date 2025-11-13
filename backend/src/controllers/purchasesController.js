const purchaseModel = require('../models/purchasesModel');

const getAllPurchases = async (_request, response) => {
    const purchase = await purchaseModel.getAllPurchases();
    return response.status(200).json(purchase);
}

const createPurchase = async (request, response) => {
    const createdpurchase = await purchaseModel.createPurchase(request.body);
    return response.status(201).json(createdpurchase);
}

const deletePurchase = async(request, response) => {
    const { id } = request.params
    await purchaseModel.deletePurchase(id);
    return response.status(204).json();
}

const updatePurchase = async (request, response) => {
    const { id } = request.params;
    const body  = request.body;

    await purchaseModel.updatePurchase(id, body);
    return response.status(204).json();
}

module.exports = { getAllPurchases, createPurchase, deletePurchase , updatePurchase};

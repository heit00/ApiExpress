const { executeBdActionAsync: executeAct, AppError } = require('./globalController');
const purchaseModel = require('../models/purchasesModel');

const getAllPurchases = async (_request, response, next) => {
    try {
        const purchase = await executeAct(() => purchaseModel.getAllPurchases());
        return response.status(200).json(purchase);
    } catch (err) {
        next(err);
    }
}

const getPurchase = async (request, response, next) => {
    try {
        const { id } = request.params;
        const purchase = await executeAct(() => purchaseModel.getPurchase(id));
        if (!purchase || Object.keys(purchase).length === 0)
            throw new AppError(`Compra não encontrada`, 404);
        return response.status(200).json(purchase);
    } catch (err) {
        next(err);
    }
}

const createPurchase = async (request, response, next) => {
    try {
        const createdpurchase = await executeAct(() => purchaseModel.createPurchase(request.body));
        if (!createdpurchase || Object.keys(createdpurchase).length === 0)
            throw new AppError(`Parece que ocorreu um erro.`, 400);
        return response.status(201).json(createdpurchase);
    } catch (err) {
        next(err);
    }
}

const deletePurchase = async (request, response, next) => {
    const { id } = request.params;
    try {
        const returned = await executeAct(() => purchaseModel.deletePurchase(id));
        if (!returned || Object.keys(returned).length === 0)
            throw new AppError(`Compra não encontrada.`, 404);
        return response.status(204).json();
    } catch (err) {
        next(err);
    }
}

const updatePurchase = async (request, response, next) => {
    const { id } = request.params;
    const body = request.body;
    try {
        const returned = await executeAct(() => purchaseModel.updatePurchase(id, body));
        if (!returned || Object.keys(returned).length === 0)
            throw new AppError(`Compra não encontrada.`, 404);
        return response.status(204).json();
    } catch (err) {
        next(err);
    }
}


module.exports = { getAllPurchases, createPurchase, deletePurchase, updatePurchase, getPurchase };

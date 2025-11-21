const { executeBdActionAsync: executeAct, AppError } = require('./globalController');
const pbModel = require('../models/pbModel');

const getAllPb = async (_request, response, next) => {
    try {
        const pb = await executeAct(() => pbModel.getAllPb());
        return response.status(200).json(pb);
    } catch (err) {
        next(err);
    }
}

const getPb = async (request, response, next) => {
    try {
        const id = { fp: request.params.id2, fc: request.params.id };
        const pb = await executeAct(() => pbModel.getPb(id));
        if (!pb || Object.keys(pb).length === 0)
                    throw new AppError(`Compra_produto não encontrada`, 404);
        return response.status(200).json(pb);
    } catch (err) {
        next(err);
    }
}

const createPb = async (request, response, next) => {
    try {
        const pb = {... request.body};
        pb.fk_compra = request.params.id;
        const createdPb = await executeAct(() => pbModel.createPb(pb));
        if (!createdPb || Object.keys(createdPb).length === 0)
                    throw new AppError(`Compra_produto não encontrada`, 404);
        return response.status(201).json(createdPb);
    } catch (err) {
        next(err);
    }
}

const deletePb = async (request, response, next) => {
    const id = { fp: request.params.id2, fc: request.params.id };
    try {
        const returned = await executeAct(() => pbModel.deletePb(id));
         if (!returned || Object.keys(returned).length === 0)
                    throw new AppError(`Compra_produto não encontrada`, 404);
        return response.status(204).json();
    } catch (err) {
        next(err);
    }
}

const updatePb = async (request, response, next) => {
    const id = { fp: request.params.id2, fc: request.params.id };
    const body = request.body;
    try {
        const returned = await executeAct(() => pbModel.updatePb(id, body));
        if (!returned || Object.keys(returned).length === 0)
            throw new AppError(`Compra_produto não encontrada`, 404);
        return response.status(204).json();
    } catch (err) {
        next(err);
    }
}


module.exports = { getAllPb, createPb, deletePb, updatePb, getPb };

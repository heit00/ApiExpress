const { executeBdActionAsync: executeAct, AppError } = require('./globalController');
const entriesModel = require('../models/entriesModel');

const getAllEntries = async (_request, response, next) => {
    try {
        const entries = await executeAct(() => entriesModel.getAllEntries());
        return response.status(200).json(entries);
    } catch (err) {
        next(err);
    }
}

const getEntry = async (request, response, next) => {
    try {
        const { id } = request.params;
        const entry = await executeAct(() => entriesModel.getEntry(id));
        if (!entry || Object.keys(entry).length === 0)
            throw new AppError(`Entrada não encontrada`, 404);
        return response.status(200).json(entry);
    } catch (err) {
        next(err);
    }
}

const createEntry = async (request, response, next) => {
    try {
        const createdEntry = await executeAct(() => entriesModel.createEntry(request.body));
        if (!createdEntry || Object.keys(createdEntry).length === 0)
            throw new AppError(`Entrada não encontrada`, 404);
        return response.status(201).json(createdEntry);
    } catch (err) {
        next(err);
    }
}

const deleteEntry = async (request, response, next) => {
    const { id } = request.params;
    try {
        const returned = await executeAct(() => entriesModel.deleteEntry(id));
        if (!returned || Object.keys(returned).length === 0)
            throw new AppError(`Entrada não encontrada`, 404);

        return response.status(204).json();
    } catch (err) {
        next(err);
    }
}

const updateEntry = async (request, response, next) => {
    const { id } = request.params;
    const body = request.body;
    try {
        const returned = await executeAct(() => entriesModel.updateEntry(id, body));
        if (!returned || Object.keys(returned).length === 0)
            throw new AppError(`Entrada não encontrada`, 404);
        return response.status(204).json();
    } catch (err) {
        next(err);
    }
}

module.exports = { getAllEntries, createEntry, deleteEntry, updateEntry, getEntry };

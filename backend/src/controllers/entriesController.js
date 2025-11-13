const entriesModel = require('../models/entriesModel');

const getAllEntries = async (_request, response) => {
    const entries = await entriesModel.getAllEntries();
    return response.status(200).json(entries);
}

const createEntry = async (request, response) => {
    const createdEntries = await entriesModel.createEntry(request.body);
    return response.status(201).json(createdEntries);
}

const deleteEntry = async(request, response) => {
    const { id } = request.params
    await entriesModel.deleteEntry(id);
    return response.status(204).json();
}

const updateEntry = async (request, response) => {
    const { id } = request.params;
    const body  = request.body;

    await entriesModel.updateEntry(id, body);
    return response.status(204).json();
}

module.exports = { getAllEntries, createEntry, deleteEntry , updateEntry};
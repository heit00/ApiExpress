const usersModel = require('../models/usersModel');

const getAllUsers = async (request, response) => {
    const users = await usersModel.getAllUsers();
    return response.status(200).json(users);
}

const createUser = async (request, response) => {
    const createdUser = await usersModel.createUser(request.body);
    return response.status(201).json(createdUser);
}

const deleteUser = async(request, response) => {
    const { id } = request.params
    await usersModel.deleteUser(id);
    return response.status(204).json();
}

const updateUser = async (request, response) => {
    const { id } = request.params;
    const body  = request.body;

    await usersModel.updateUser(id, body);
    return response.status(204).json();
}

module.exports = { getAllUsers, createUser, deleteUser , updateUser};
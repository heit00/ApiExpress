const bcrypt = require('bcrypt');
const { executeBdActionAsync: executeAct, AppError } = require('./globalController');
const usersModel = require('../models/usersModel');

const getAllUsers = async (_request, response, next) => {
    try {
        const users = await executeAct(() => usersModel.getAllUsers());
        return response.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

const getUser = async (request, response, next) => {
    try {
        const { id } = request.params;
        const user = await executeAct(() => usersModel.getUser(id));
        if (!user || Object.keys(user).length === 0)
            throw new AppError(`Ops, o usuário não existe.`, 404);
        return response.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

const createUser = async (request, response, next) => {
    const body = { ...request.body };
    body.senha = await bcrypt.hash(body.senha, 10);
    try {
        const createdUser = await executeAct(() => usersModel.createUser(body));
         if (!createdUser || Object.keys(createdUser).length === 0)
            throw new AppError(`Ops, parece que algo deu errado.`, 400);
        return response.status(201).json(createdUser);
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (request, response, next) => {
    const { id } = request.params;
    try {
        const returned = await executeAct(() => usersModel.deleteUser(id));

        if (!returned || Object.keys(returned).length === 0)
            throw new AppError(`Ops, o usuário não existe.`, 404);

        return response.status(204).json();
    } catch (err) {
        next(err); 
    }
}

const updateUser = async (request, response, next) => {
    const { id } = request.params;
    const body = { ...request.body };

    if (body.senha)
        body.senha = await bcrypt.hash(body.senha, 10);

    try {
        const returned = await executeAct(() => usersModel.updateUser(id, body));
         if (!returned || Object.keys(returned).length === 0)
            throw new AppError(`Ops, o usuário não existe.`, 404);
        return response.status(204).send();
    } catch (err) {
        next(err); 
    }
}

module.exports = { getAllUsers, createUser, deleteUser, updateUser, getUser };

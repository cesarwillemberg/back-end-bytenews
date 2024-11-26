const express = require('express');
const authController = require('../controllers/auth-controller');
const fs = require('node:fs');
const path = require('node:path');
const userRouter = express.Router();


const users = require('../models/users');

const databasePath = path.resolve(__dirname, '../../database.json');

userRouter.get('/', (req, res) => {
    res.send(users);
});


userRouter.post('/register', (req, res) => {
    const { id, username, email } = req.body;

    const userAlreadyExists = users.find(user => user.username === username);
    const emailAlreadyExists = users.find(user => user.email === email);


    if (userAlreadyExists || emailAlreadyExists) return res.status(400).json({ error: 'Usuário já cadastrado.' });

    const newUser = { id, username, email, role: 'standard' }

    users.push(newUser);

    res.status(201).json(newUser);
});


module.exports = userRouter;

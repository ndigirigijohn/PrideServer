const express = require('express');
const users = express.Router();
const {getUsers, register, login, setCode} = require('../controllers/users')

users.get('/get/all', getUsers);
users.post('/register', register);
users.post('/login', login);
users.put('/set/:id', setCode);


module.exports = {users};   
const express = require('express');
const users = express.Router();
const {getUsers, register, login, setCode,  findUserByName} = require('../controllers/users')

users.get('/get/all', getUsers);
users.post('/register', register);
users.post('/login', login);
users.put('/set/:id', setCode);
users.get('/find/byname/:username', findUserByName);


module.exports = {users};   
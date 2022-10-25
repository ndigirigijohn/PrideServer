const express = require('express');
const codes = express.Router();
const { getCodesByIdentifier,readCodes, addCode} = require('../controllers/codes')

codes.get('/', readCodes);
codes.get('/:code', getCodesByIdentifier)
codes.post('/create', addCode);



module.exports = {codes};
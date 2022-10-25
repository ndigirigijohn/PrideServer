const express = require('express');
const feedback = express.Router();
const {create} = require('../controllers/feedback')
const mailhandler = require('../middleware/mailhandler')

feedback.post('/',mailhandler, create);



module.exports = {feedback};
const express = require('express');
const feedback = express.Router();
const {create, readLastFiveFeedback} = require('../controllers/feedback')
const mailhandler = require('../middleware/mailhandler')

feedback.post('/',mailhandler, create);
feedback.get('/read', readLastFiveFeedback);





module.exports = {feedback};
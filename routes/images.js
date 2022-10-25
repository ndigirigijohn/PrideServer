const express = require('express');
const images = express.Router();
const {generateUploadURL} = require('../controllers/images')

images.get('/url', generateUploadURL);



module.exports = {images};
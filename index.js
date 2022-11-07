const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { products } = require('./routes/products');
const { users } = require('./routes/users');
const { images } = require('./routes/images');
const { codes } = require("./routes/codes");
const { orders } = require("./routes/orders");
const { feedback } = require("./routes/feedback");


const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

app.use('/',products);
app.use('/users',users);
app.use('/images',images);
app.use('/p/codes/g',codes);
app.use('/orders',orders);
app.use('/feedback',feedback);



mongoose.connection.once('open', ()=>{
    console.log('connected to mongoDB')
})
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
const express = require('express');
const products = express.Router();
const  {getProducts,
            getProduct, 
            createProduct,
             getProductByCode,
              search,
               searchByCategory,
               filterByCategory,
               filterByCategories,
            } = require ('../controllers/products');
            
 products.get('/', (req, res)=>{
   res.status(200).json({message: 'Welcome to the Pride Server'});

 });
products.get('/:page/:limit', getProducts);
products.post('/', createProduct);
products.get('/:id', getProduct);
products.get('/code/a/z/:code', getProductByCode);
products.get('/products/search/:query', search);
products.get('/products/search/:category/:query', searchByCategory);
products.get('/filter/:category', filterByCategory);
products.post('/filters/categories', filterByCategories);








module.exports = {products};
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
               getProductsByPage,
               editProduct,
               deleteProduct,
            } = require ('../controllers/products');
            
 products.get('/', (req, res)=>{
   res.status(200).json({message: 'Welcome to the Pride Server'});

 });
products.get('/all/random', getProducts);
products.get('/bypage/:page/:limit', getProductsByPage);

products.post('/', createProduct);
products.get('/:id', getProduct);
products.get('/code/a/z/:code', getProductByCode);
products.get('/products/search/:query', search);
products.get('/products/search/:category/:query', searchByCategory);
products.get('/filter/:category', filterByCategory);
products.post('/filters/categories', filterByCategories);
products.put('/:id', editProduct);
products.delete('/:id', deleteProduct);
module.exports = {products};
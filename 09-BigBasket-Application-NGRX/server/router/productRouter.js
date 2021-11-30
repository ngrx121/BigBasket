const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/*
    INFO : GET all the products
    URL : http://127.0.0.1:5000/api/products/
	METHOD : GET
	Fields : no-fields
	express function : router.get();

 */
router.get('/products', async (request , response) => {
    try {
        let products = await Product.find();
        response.status(200).json(products);
    }
    catch (error) {
        response.status(500).json({
            error : error
        });
    }
});

/*
    INFO : GET a single Product
    URL : http://127.0.0.1:5000/api/products/:id
	METHOD : GET
	Fields : no-fields
	express function : router.get();
 */
router.get('/products/:id', async (request , response) => {
    let productId = request.params.id;
    try {
        let product = await Product.findById(productId); // select * from products where id=''
        response.status(200).json(product);
    }
    catch (error) {
        response.status(500).json({
            error : error
        });
    }
});

/*
    INFO : Create a Product
    URL : http://127.0.0.1:5000/api/products/
	METHOD : POST
	Fields : name , image , price , qty , info
	express function : router.post();
 */
router.post('/products', async (request , response) => {
    try {
        let newProduct = {
            name : request.body.name,
            image : request.body.image,
            price : request.body.price,
            qty : request.body.qty,
            info : request.body.info
        };
        //check the product is exists or not
        let product = await Product.findOne({name : newProduct.name});
        if(product){
            return response.status(400).json({
                result : 'Failed',
                message : 'Product is already exists'
            });
        }
        product = new Product(newProduct);
        product = await product.save(); // INSERT data to database
        response.status(200).json(product);
    }
    catch (error) {
        response.status(500).json({
            error : error
        });
    }
});

/*
    INFO : Update a Product
    URL : http://127.0.0.1:5000/api/products/:id
	METHOD : PUT
	Fields : name , image , price , qty , info
	express function : router.put();
 */
router.put('/products/:id', async (request , response) => {
    let productId = request.params.id;
    try {
        let updatedProduct = {
            name : request.body.name,
            image : request.body.image,
            price : request.body.price,
            qty : request.body.qty,
            info : request.body.info
        };
        let product = await Product.findById(productId);
        if(product){
            product = await Product.findByIdAndUpdate(productId , {
                $set : updatedProduct
            }, {new : true});
            response.status(200).json(product);
        }
        else{
            return response.status(400).json({
                result : 'failed',
                message : 'No Product is found to update'
            });
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            error : error
        });
    }
});

/*
    INFO : Delete a Product
    URL : http://127.0.0.1:5000/api/products/:id
	METHOD : DELETE
	Fields : no-fields
	express function : router.delete();
 */
router.delete('/products/:id', async (request , response) => {
    let productId = request.params.id;
   try {
        let product = await Product.findByIdAndDelete(productId);
        response.status(200).json(product)
   }
   catch (error) {
       response.status(500).json({
           error : error
       });
   }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const formidable = require('formidable');
const fs = require('fs');
const productById = require('../middleware/productById');

router.post("/", auth, adminAuth,(req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;

    form.parse(req, async(err,fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        if(!files.photo){
            return res.status(400).json({
                error: 'Image is required'
            })
        }

        if(files.photo.type !== 'image/jpeg' && files.photo.type !== 'image/jpg' && files.photo.type !== 'image/png'){
            return res.status(400).json({
                error: 'Image type not allowed'
            })
        }

        const {name,description,price,category,quantity,shipping} = fields;
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: 'All fields are required'
            })
        }

        let product = new Product(fields)
        if(files.photo.size > 1000000){
            return res.status(400).json({
                error: 'Image should be less than 1MB in size'
            })
        }

        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;

        try {
            await product.save()
            res.json('Product Created Sucessfully')
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    })
})

router.get('/list', async (req,res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    try {
        let products = await Product.find({})
        .select('-photo').populate('category').sort([
            [sortBy,order]
        ]).limit(limit).exec();

        res.json(products)
    } catch (error) {
        console.log(error);
        res.status(500).send('Invalid query')
    }
})

router.get('/categories', async (req,res) => {
    try {
        let categories = await Product.distinct('category');
        if(!categories){
            return res.status(400).json({
                error: 'Categories not found'
            })
        }
        res.json(categories)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error')
    }
})

router.get('/search', async (req,res) => {
    const query = {};
    if(req.query.search){
        query.name = {
            $regex: req.query.search,
            $options: 'i'
        }
    }

    if(req.query.category && req.query.category != 'All'){
        query.category = req.query.category
    }

    try {
        let products = await Product.find(query).select('-photo');
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error to get products')
    }
} )

router.get('/:productId', productById, (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
});

router.get('/photo/:productId', productById, (req,res) => {
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data);
    }

    res.status(400).json({
        error: 'Failed to load image'
    })
})




module.exports = router;
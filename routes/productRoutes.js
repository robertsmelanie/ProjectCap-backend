const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST one OR many products
router.post('/', async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const products = await Product.insertMany(req.body); // handle array
            res.status(201).json(products);
        } else {
            const { ItemTitle, Image, Price, Description, Keywords } = req.body;
            const newProduct = new Product({ ItemTitle, Image, Price, Description, Keywords });
            const savedProduct = await newProduct.save(); // handle single
            res.status(201).json(savedProduct);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Products = require('../models/productModel');

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Products.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST one OR many products
router.post('/', async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const products = await Products.insertMany(req.body); // handle array
            res.status(201).json(products);
        } else {
            const { ItemTitle, Image, Price, Description, Keywords } = req.body;
            const newProducts = new Products({ ItemTitle, Image, Price, Description, Keywords });
            const savedProducts = await newProducts.save(); // handle single
            res.status(201).json(savedProducts);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

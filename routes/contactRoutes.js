const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');

// GET all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST one OR many contacts
router.post('/', async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const contacts = await Contact.insertMany(req.body); // handle array
            res.status(201).json(contacts);
        } else {
            const { name, email, message} = req.body;
            const newContacts = new Contact({ name, email, message});
            const savedContacts = await newContacts.save(); // handle single
            res.status(201).json(savedContacts);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

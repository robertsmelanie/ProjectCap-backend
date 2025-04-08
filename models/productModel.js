const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    ItemTitle: { type: String, required: true },
    Image: { type: String },
    Price: { type: Number, required: true },
    Description: { type: String, required: true },
    Keywords: [String],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
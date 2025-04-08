const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config(); //Load variables from the .env file
const bodyParser = require("body-parser");
// const { Configuration, OpenAIApi } = // require("openai");
const { OpenAI } = require('openai');
const cors = require('cors');




const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(require('cors')());
// const PORT = process.env.PORT || 3001; // Use port from .env or default to 5000
console.log(process.env.MONGO_URI);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  
    .then(() => console.log('MongoDB Connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- Define a Mongoose Schema and Model ---
// This defines the structure of the documents in your 'items' collection
const itemSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    ItemTitle: { type: String, required: true },
    Image: { type: String },
    Price: { type: String, required: true },
    Description: { type: String, required: true },
    Keywords: { type: Array }, 
    // Add other fields that match your JSON structure
});

const Item = mongoose.model('Item', itemSchema); // 'Item' model will interact with the 'items' collection

// --- API Routes ---
// Basic route to test server
app.get('/', (req, res) => {
    res.send('Hello from the Backend API!');
});

// GET endpoint to fetch all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find(); // Fetch all documents from the 'items' collection
        res.json(items); // Send the items back as JSON
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).json({ message: 'Server error while fetching items' });
    }
});

// POST endpoint to add a new item (Example - you might not need this initially)
app.post('/api/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        console.error("Error adding item:", err);
        // Check for validation errors specificallyif needed
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Server error while adding item' });
    }
});
// Use product routes
// app.use('/api', productRoutes);
app.use('/api', productRoutes); // mount it under /api
// --- Start the Server --
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Set in .env or hosting dashboard
});
// const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message;

    const systemPrompt = {
        role: "system",
        content: "You are Dusty the barn cat. You're clever, sarcastic, a bit grumpy, and live in a barn. You like naps, hate loud noises, and are good at catching mice. Respond with short, sassy replies."
    };

    const messages = [systemPrompt, { role: "user", content: userMessage }];

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
        });

        const reply = response.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error("OpenAI error:", error.response?.data || error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// --- Start Server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


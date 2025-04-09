require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { OpenAI } = require('openai');

// Route imports
const authRoutes = require('./routes/authRoutes');
const productsRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

console.log('MONGO_URI =', MONGO_URI);

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Schema & Model


// Basic Routes
app.get('/', (req, res) => res.send('Server is live!'));
app.use('/products', productsRoutes)
app.use('/contact', contactRoutes)



// OpenAI Chat Route
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

// Mount route modules
app.use('/auth', authRoutes);

// Database Connection & Server Start
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

console.log('MONGO_URI =', MONGO_URI);


const cors = require('cors');




// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// Routes
app.use(authRoutes);
// app.use(productRoutes);


app.get('/', (req, res) => res.send('Server is live!'));
app.get('/items', (req, res) => res.send('Items page'));
app.use('/products', productRoutes)

// Database Connection
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

// Database Connection
// mongoose.connect(MONGO_URI);

// mongoose.connection.on('connected', () => {
//   console.log('MongoDB connected successfully');
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//   });
// });

// mongoose.connection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });

// DB Connection
// mongoose.connect(MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB connected successfully');
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB connection error:', err);
//   });
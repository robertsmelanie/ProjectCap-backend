// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/authRoutes');
// const router = express.Router();
// const productRoutes = require('./routes/productRoutes');

// const Product = require('./models/productModel'); 

// const app = express();

// app.use(express.static('public'));

// app.set('view engine', 'ejs');  I don't think I need this one


// console.log('🔍 MONGO_URI =', JSON.stringify(process.env.MONGO_URI));
//database connection
// const dbURI = process.env.MONGO_URI; 
// console.log('RAW URI:', [...process.env.MONGO_URI]);
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then((result) => app.listen(3111))
//   .catch((err) => console.log(err));



  //routes
// app.get('/', (req, res) => res.render('home'));
// app.get('/items', (req, res) => res.render('items'));

// app.use(productRoutes);

// const PORT = process.env.PORT || 3111;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
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
const express= require('express');
const cors = require('cors');
const app= express();
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const userRoute= require('./routes/userRoute');
const productRoute= require('./routes/productRoute');
const contactRoute= require('./routes/contactRoute');
const reviewRoute= require('./routes/reviewRoutes');
const cartRoute= require('./routes/cartRoute');
const couponRoutes = require('./routes/couponRoute');


// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', // Update to your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));


const Port= process.env.PORT || 8000
const MongoURL= process.env.MONGO_URI
console.log(MongoURL)

// MongoDB Connection
mongoose.connect(MongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });

  
  app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
  });
  

  app.use('/api/user', userRoute);  // user route
  app.use('/api/product', productRoute);  // product route
  app.use('/api', contactRoute);   // contact route
  app.use('/api/product', reviewRoute);  // review route
  app.use('/api/cart', cartRoute);  // cart route
  app.use('/api/coupons', couponRoutes);  // coupon route
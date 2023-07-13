const express =  require('express');
const cors = require("cors");
const multer = require('multer');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const route = require("./controller/route");
//import * as dotenv from 'dotenv';
const cloudinary = require('cloudinary').v2;
const path = require('path');
const PORT = 4500;
//dotenv.config();
mongoose.set('strictQuery', true);
 mongoose.connect("mongodb+srv://pranaav6703:sunny1234@cluster0.akzd3ue.mongodb.net/mydatabase?retryWrites=true&w=majority", {
   useNewUrlParser: true,
  useUnifiedTopology: true,
 });



var db = mongoose.connection;
db.on('error',()=>{console.log("Error occured")});
db.once('open',()=>console.log("Connected to database"));

const app = express();
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/backend',route);
///////////////////////////

cloudinary.config({
  cloud_name: 'duxmcvo7j',
  api_key: '147614282417372',
  api_secret: 'KeB1q8O82JeWihiUdvJz-WVEwQs'
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  email: String,
  condition: String,
  category: String,
  description: String,
  time: String,
  status: String,
  buyer: String,
  imageUrl: String
});

//////////////
const Product = mongoose.model('Product', productSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle form submission and save the data to MongoDB
app.post('/addproduct', upload.single('images'), async (req, res) => {
  try {
    // Convert the image buffer to a string
    const imageBuffer = req.file.buffer.toString('base64');

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${imageBuffer}`, { folder: 'product-images' });

    // Save the image URL and other form data to MongoDB
    const { name, price, email, condition, category, description, time, status , buyer } = req.body;
    const newProduct = new Product({
      name,
      price,
      email,
      condition,
      category,
      description,
      time,
      status,
      buyer,
      imageUrl: result.secure_url
    });
    await newProduct.save();

    res.status(200).json({ message: 'Product saved successfully' });
  } catch (error) {
    console.error('Failed to save product:', error);
    res.status(500).json({ error: 'Failed to save product' });
  }
});


app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Failed to retrieve products', error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

app.listen(process.env.PORT || 4500, () => {
  console.log(`API listening on PORT ${PORT} `)
})

module.exports = app;
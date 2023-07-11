const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
    images: [String],
  });
/*
Schema({obj},{collection})
*/
module.exports = mongoose.model('Product',productSchema);
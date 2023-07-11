const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CardSchema = new Schema({

    buyer:String,
    price:Number,
    name:String

},

{

    collection: "CartDetails"

})


module.exports = mongoose.model('CartDetails',CardSchema)
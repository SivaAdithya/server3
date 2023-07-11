const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String},
    amount: {type: String},
    email : {type:String}
},
{
    collection: "sample1"
});
/*
Schema({obj},{collection})
*/
module.exports = mongoose.model('sample1',schema);
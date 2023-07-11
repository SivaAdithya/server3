const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema_card = new Schema({
    number: {type: String},
    year: {type: String},
    cvv : {type: String}
},
{
    collection: "CardDetails"
});
/*
Schema({obj},{collection})
*/
module.exports = mongoose.model('CardDetails',schema_card);
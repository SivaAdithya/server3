const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema_users = new Schema({
    name: {
		type: String,
		required: true
	  },
	  
	  email: {
		type: String,
		required: true
	  },
	  password: {
		type: String,
		required: true
	  },
	  mobNo: {
		type: String,
		required: true
	  }
},
{
    collection: "users"
});
/*
Schema({obj},{collection})
*/
module.exports = User = mongoose.model('users', schema_users);
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const CustomerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim : true
    },
    email:{
        type:String,
        required:true,
        trim : true

    },
    balance:{
        type:Number,
        default:0
    }
});

//Create Timestamp

CustomerSchema.plugin(timestamp);
const Customer = mongoose.model('Customer',CustomerSchema);
//export the model schema

module.exports= Customer;

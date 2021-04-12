// define the url schema

const mongoose = require('mongoose');

let schema = mongoose.Schema({
    url:{
        type:String,
        required:true,
        unique:true
    },
    html:{
        type:String
    }
});

module.exports = mongoose.model('url', schema);
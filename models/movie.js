var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    fields:{
        title : String,
        year:Number
    }
 
})

module.exports = mongoose.model('Movie',schema)
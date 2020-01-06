var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    fields:{
        title : String,
        year: Number,
        image_url: String,
        release_date: String,
        genres: [String],
        directors: [String],
        actors: [String],
        rating: Number,
        plot: String,
        running_time_secs: Number
    }
 
})

module.exports = mongoose.model('Movie',schema)
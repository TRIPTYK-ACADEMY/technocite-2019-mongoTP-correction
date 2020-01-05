const http = require('http')
const router = require('./appRouter')
const mongoose = require('mongoose')
mongoose.Promise=global.Promise;
require('./config')


/**
 * Create Database connexion
 */
mongoose.connect('mongodb://@localhost:27017/technocite',{ useNewUrlParser: true,useUnifiedTopology: true },(error)=>{
    if(error) throw error;
    console.log("Mongo is now connected to our system please request away")
})

/**
 * CREATE SERVER WITH HTTP
 */

 http.createServer(router).listen(global.config.port,(error)=>{
     if(error) throw error;
     console.log(`Server is running on port ${global.config.port}`)
 })
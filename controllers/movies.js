const fsp = require('fs').promises;
const Movie = require('../models/movie');
const Helper = require('../helpers/index');
/**
 * @param {*} request
 * @param {*} response
 */

exports.list = async (request, response) => {
    console.log('LISTING')
    let output;
    let template = await fsp.readFile(`${process.cwd()}/views/index.html`, 'UTF-8')
    let html = '<ul>';
    let movies = await Movie.find({}).limit(100)
    movies.forEach((movie)=>{
        html += `<li><a href="/movies/${movie.id}">${movie.fields.title} : ${movie.fields.year}</a></li>`
    })
    html+='</ul>'
    output = template.replace(/{{LIST}}/, html)
    response.end(output)
}

exports.read = async (request, response) => {
    let movie;
    let id = await Helper.parameter(request);

    if(!id){
        response.end(
            fsp.readFile(`${process.cwd()}/views/error.html`)
        )
    }

    try{
        movie = await Movie.findOne({_id: id});
    } catch(e){
        response.end(
            fsp.readFile(`${process.cwd()}/views/error.html`)
        )
    }
    console.log(movie)
    response.end();
}
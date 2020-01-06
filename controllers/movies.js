const fsp = require('fs').promises;
const Movie = require('../models/movie')
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
        html += `<li>${movie.fields.title} : ${movie.fields.year} </li>`
    })
    html+='</ul>'
    output = template.replace(/{{LIST}}/, html)
    response.end(output)
}
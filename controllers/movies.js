const fsp = require('fs').promises;
const Movie = require('../models/movie');
const Helper = require('../helpers/index');
const Moment = require('moment');
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
    let output;

    let details = `
        <p>
            <h2>${movie.fields.title} || Rating: ${movie.fields.rating}</h2>
            Genres: ${movie.fields.genres.toString()}<br>
            Resume: ${movie.fields.plot}<br>
            <img src="${movie.fields.image_url.replace('http://', 'https://')}"><br>
            Release date: ${Moment(movie.fields.release_date).format('DD-MM-YYYY')}<br>
            Directors: ${movie.fields.directors.reduce((oldString, newString) => `${oldString.toUpperCase()} | ${newString.toUpperCase()}`)}<br>
            Actors: ${movie.fields.actors.reduce((oldString, newString) => `${oldString.toUpperCase()} | ${newString.toUpperCase()}`)}<br>
    `
    if(movie.fields.running_time_secs){
        details += `Time: ${Moment.duration(parseInt(movie.fields.running_time_secs)*1000).asMinutes()} minutes`
    }
    details += '</p>'
    let template = await fsp.readFile(`${process.cwd()}/views/read.html`, 'UTF-8');
    output = template.replace(/{{DETAILS}}/, details);
    response.end(output);
}
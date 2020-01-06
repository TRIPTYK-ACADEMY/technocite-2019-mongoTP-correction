const fsp = require('fs').promises;

exports.handleError = async (request, response) => {
    let template = await fsp.readFile(`${process.cwd()}/views/error.html`, 'UTF-8');
    response.end(template);
}
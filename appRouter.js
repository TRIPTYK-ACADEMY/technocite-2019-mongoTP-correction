const Helper = require('./helpers/index');

const routes = [
    { url: '/', controller: 'movies', method: 'GET', action: 'list' },
    { url: '/movies/:id', controller: 'movies', method: 'GET', action: 'read'}
];

module.exports = async (request, response) => {
    const parsedRoutes = await Helper.parser(request, routes);
    if (request.url === '/favicon.ico'){
        response.end();
    }
    let index = parsedRoutes.findIndex((route) => route.url === request.url && route.method === request.method);
    let controller;

    if (index !== -1) {
        controller = require(`${process.cwd()}/controllers/${routes[index].controller}`)
        controller[routes[index].action](request, response);
    } else {
        controller = require(`${process.cwd()}/controllers/error`);
        controller['handleError'](request, response);
    }
}
const routes = [
    { url: '/', controller: 'movies', method: 'GET', action: 'list' }
];

module.exports = async (request, response) => {
    if (request.url === 'favicon.ico') response.end()
    let index = routes.findIndex((route) => route.url === request.url && route.method === request.method);
    let controller;

    if (index !== -1) {
        controller = require(`${process.cwd()}/controllers/${routes[index].controller}`)
    }
    controller[routes[index].action](request, response);
}
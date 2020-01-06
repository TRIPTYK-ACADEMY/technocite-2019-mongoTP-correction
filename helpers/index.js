exports.parser = (request, routes) => {

    let regex = /([0-9])/;

    if(!regex.test(request.url)){
        return routes;
    }

    let location = request.url.split('/');
    let id = location[location.length-1];
    let newRoutes = routes;
    let parsed = newRoutes.map(route => {
        if(route.url.includes(':id')){
            return { url: route.url.replace(':id', id), controller: route.controller, method: route.method, action: route.action};
        } else {
            return { url: route.url, controller: route.controller, method: route.method, action: route.action};
        }
    })

    return parsed;
}

exports.parameter = request => {
    let location = request.url.split('/');
    return location[location.length-1];
}
const Boom = require('@hapi/boom');
const Hoek = require('@hapi/hoek');

exports.plugin = {
    name: 'AuthenticationPlugin',
    register: async (server, options) => {
        const settings = Hoek.clone(options);
        server.realm.modifiers.route.prefix = options.BASE_ROUTE_PREFIX;
        server.route(
            {
                method: "GET",
                path: "/result",
                handler: async (request, h) => {
                    console.log("AuthenticationPlugin --------------->");
                    const users = {
                        marees: {
                            username: 'marees',
                            password: 'password'
                        }
                    };
                    //check authorization header in request
                    const authorization = request.headers.authorization;
                    console.log({authorization});
                    if (!authorization) {
                        return Boom.unauthorized(null, 'Basic', settings.unauthorizedAttributes);
                    }
                    //check valid Basic authorization
                    const parts = authorization.split(/\s+/);
                    if (parts[0].toLowerCase() !== 'basic') {
                        return Boom.unauthorized(null, 'Basic', settings.unauthorizedAttributes);
                    }
                    if (parts.length !== 2) {
                        return Boom.badRequest('Bad HTTP authentication header format', 'Basic');
                    }
                    const credentialsPart = new Buffer(parts[1], 'base64').toString();
                    const sep = credentialsPart.indexOf(':');
                    if (sep === -1) {
                        return Boom.badRequest('Bad header internal syntax', 'Basic');
                    }
                    //check valid username and password
                    const username = credentialsPart.slice(0, sep);
                    const password = credentialsPart.slice(sep + 1);
                    var user = users[username];
                    console.log({user}, username, password)
                    if (!user) {
                        return await h.response()
                                .message("Basic Authentication Failed..")
                                .code(401);
                    } else if (password === user.password) {
                        console.log("yes")
                        // console.log(h)
                        // return 'success';
                        return await h.response('auth success').code(200);
                        // return new Boom('success', {statusCode: 200});
                    } else {
                        return await h.response()
                                .message("Basic Authentication Failed..")
                                .code(401);
                    }

                }
            }
        );
    }

};

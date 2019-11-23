exports.plugin = {
    name: "RoutesPlugin",
    register: async (server, options) => {

        server.method('add', (a, b) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(a + b);
              }, 300);
            });
        }, {
            cache: {
              expiresIn: 60000,
              generateTimeout: 1000
            }
        });
        
    
        server.route([
            {
                method: "GET",
                path: "/api/hello",
                handler: async (request, h) => {
                    return "Hello, World";
                }
            },
            {
                method: "GET",
                path: "/api/hello/html",
                handler: async (request, h) => {
                    const response = h.response('<html><head><title>hi</title></head><body><h1>Hello</h1></body></html>');
                    response.type("text/html");
                    return response;             
                }
            },
            {
                method: 'GET',
                path: '/add',
                handler: async (request, h) => {
                    try {
                        const { a, b } = request.query;
                        const result = await server.methods.add(parseInt(a), parseInt(b));
                        return result;
                    } catch (err) {
                        throw err;
                    }
                }
            }
        ]);
    
    }
  };
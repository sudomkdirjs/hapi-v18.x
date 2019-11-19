module.exports = {
    name: "ApiPlugin",
    register: async (server, options) => {
    
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
        }
      ]);
    
    }
  }
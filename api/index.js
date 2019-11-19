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
        }
      ]);
    
    }
  }
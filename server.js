const Hapi = require("@hapi/hapi");
const api = require("./api");
const registerPlugins = require("./plugins");

// define some constants
const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 3000;
const RADIX = 10;

const myServer = async () => {
    try {

    // define server
    const server = Hapi.server({
        host: process.env.HOST || DEFAULT_HOST, 
        port: parseInt(process.env.PORT, RADIX) || DEFAULT_PORT,
        app: {}
    });

    await server.register(api);

    await registerPlugins(server);
  
    await server.start();
    
    console.log(`Hapi server running at ${server.info.uri}`);
  
    } catch (err) {
    
      console.log("Hapi error starting server", err);
    
    }
};

myServer();
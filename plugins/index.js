
module.exports = async (server) => {
    await server.register([
        {
            plugin: require('./AuthPlugin'),
            options: {
                name: "marees"
            }
        }
    ]);
};
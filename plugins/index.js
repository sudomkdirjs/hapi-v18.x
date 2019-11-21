
module.exports = async (server) => {
    await server.register([
        {
            plugin: require('./AuthPlugin'),
            options: {
                name: "marees"
            }
        },
        {
            plugin: require('./AuthenticationPlugin'),
            options: {
                "BASE_ROUTE_PREFIX": "/auth"
            }
        }
    ]);
};
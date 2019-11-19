module.exports = {
    name: "AuthPlugin",
    register: async (server, options) => {

        const users = {
            marees: {
                username: 'marees',
                password: 'password',   // 'secret'
                name: 'Marees',
                id: '12345'
            }
        };
        
        const validate = async (request, username, password, h) => {
 
            if (username === 'help') {
                return { response: h.redirect('https://hapijs.com/help') };     // custom response
            }
         
            const user = users[username];

            if (!user) {
                return { credentials: null, isValid: false };
            }
         
            const isValid = password === user.password;
            const credentials = { id: user.id, name: user.name };
         
            return { isValid, credentials };
        };
    
        await server.register(require('@hapi/basic'));

        server.auth.strategy('simple', 'basic', { validate });
        server.auth.default('simple');

    
    }
};
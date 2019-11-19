module.exports = {
    name: "CookieAuthPlugin",
    register: async (server, options) => {

        const cookie_ttl = 60; // For cookie expired in Minutes
    
        await server.register(require('@hapi/cookie'));

        server.auth.strategy('session', 'cookie', {
 
            cookie: {
                name: options.cookieName || 'marees',
                password: options.password || 'password',
                isSecure: false,
		        ttl: (cookie_ttl * 60000)
            },

            // redirectTo: '/api/hello',
     
            validateFunc: async (request, session) => {
     
                if (session) {
                    let customerId = false;
                    let isHidSysAdminRole = session.roles.includes('HIDSysAdmin');
                    if (request.params.customer_id) {
                        customerId = request.params.customer_id;
                    }
                    if (request.params.companyID) {
                        customerId = request.params.companyID;
                    }
                    
                    if (!customerId) {
                        return { isValid: true, credentials: session };
                    }
                    else if (customerId !== undefined && customerId != session.companyId && isHidSysAdminRole === false) {
                        const credentials = {
                            "statusCode": 401,
                            "error": "Unauthorized",
                            "message": "session violation occurred."
                        };
                        return { isValid: true, credentials };
                    }
                    return { isValid: true, credentials: session };
                } else {
                    const credentials = {
                        "statusCode": 401,
                        "error": "Unauthorized",
                        "message": "Invalid session"
                    };
                    return { isValid: true, credentials };
                }
            }
        });
     
        server.auth.default('session');

    
    }
};
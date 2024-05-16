const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Twitter API Documentation',
            version: '1.0.0',
            description: 'API documentation for my Twitter Node.js project',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Replace with your server URL
            },
        ],
        security: [ // Add security definition
            {
                JWTAuth: [], // Reference to security scheme defined below
            },
        ],
        components: { // Define security scheme
            securitySchemes: {
                JWTAuth: { // Name of the security scheme
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },

    apis: ['./swaggerDocs/*.js'], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

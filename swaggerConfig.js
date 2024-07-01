const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const swaggerDefinition = {
    openapi: '3.0.0', // Version of OpenAPI
    info: {
        title: 'Node.js API',
        version: '1.0.0', 
        description: 'Documentation for the Node.js API', // TodoList of the API
    },
    servers: [
        {
            url: 'http://localhost:4000', 
            description: 'Local server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/todoRoutes.js', './routes/userRoutes.js'], 

};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

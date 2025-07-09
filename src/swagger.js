const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API',
      version: '1.0.0',
      description: 'API RESTful para tienda en línea (Users, Products, Orders)',
    },
    servers: [
      { url: 'http://localhost:3001', description: 'Servidor local' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id:   { type: 'integer', example: 1 },
            name: { type: 'string',  example: 'Andrés' },
            email:{ type: 'string',  example: 'andres@example.com' },
          }
        },
        Product: {
          type: 'object',
          properties: {
            id:          { type: 'integer', example: 1 },
            name:        { type: 'string',  example: 'Camiseta básica' },
            description: { type: 'string',  example: 'Camiseta de algodón...' },
            price:       { type: 'number',  example: 19.99 },
            stock:       { type: 'integer', example: 50 },
          }
        },
        OrderItem: {
          type: 'object',
          properties: {
            id:        { type: 'integer', example: 1 },
            productId: { type: 'integer', example: 1 },
            quantity:  { type: 'integer', example: 2 },
            price:     { type: 'number',  example: 19.99 },
          }
        },
        Order: {
          type: 'object',
          properties: {
            id:         { type: 'integer', example: 1 },
            userId:     { type: 'integer', example: 1 },
            total:      { type: 'number',  example: 129.88 },
            OrderItems: {
              type: 'array',
              items: { $ref: '#/components/schemas/OrderItem' }
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGciOiJI...' }
          }
        }
      }
    },
    security: [ { bearerAuth: [] } ]
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

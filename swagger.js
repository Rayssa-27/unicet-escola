
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API Escolar',
        description: 'Documentação da API Escolar'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

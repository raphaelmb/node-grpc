const clientGrpc = require('./client');

const id = 1;

clientGrpc.findOne({id}, (error, response) => {
    if (error) {
        console.log(error)
    };
    console.log('Retorno de um cliente por id')
    console.log(response)
});
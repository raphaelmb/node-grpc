const clientGrpc = require('./client');

const id = 2;

clientGrpc.findOne({id}, (error, response) => {
    if (error) {
        console.log('Error', error)
    };
    console.log('Retorno')
    console.log(response)
});
const clientGrpc = require('./client');

const id = 3

clientGrpc.deleteOne({id}, (error, response) => {
    if (error) {
        console.log('Erro', error)
    }
    console.log('Cliente removido:')
    console.log(response)
});

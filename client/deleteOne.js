const clientGrpc = require('./client');

const id = 2

clientGrpc.deleteOne({id}, (error, response) => {
    if (error) {
        console.log(error)
    }
    console.log('Cliente removido:')
    console.log(response)
});

const clientGrpc = require('./client');

const client = {
    id: 3,
    name: 'Cliente Criado',
    email: 'clientecriado@empresa.com'
}

clientGrpc.create(client, (error, response) => {
    if (error) {
        console.log(error)
    }
    console.log('Cliente criado:')
    console.log(response)
});

const clientGrpc = require('./client');

clientGrpc.findAll({}, (error, response) => {
    if (error) {
        console.log('Error', error)
    }
    
    const { clients } = response;
    console.log('Retorno:')
    console.log('Clients', clients)
});
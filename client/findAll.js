const clientGrpc = require('./client');

clientGrpc.findAll({}, (error, response) => {
    if (error) {
        console.log(error)
    }
    
    const { clients } = response;
    console.log('Retorno de todos clientes')
    console.log(clients)
});
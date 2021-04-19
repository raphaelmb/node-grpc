const clientGrpc = require('./client');

clientGrpc.findAll({}, (error, response) => {
    if (error) {
        console.log('Error', error)
    }
    
    const { clients } = response;
    console.log('Clients', clients)
});
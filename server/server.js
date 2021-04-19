const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./clients.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
   });
const {clients} = require('../mock/mock');

const clientProto = grpc.loadPackageDefinition(packageDefinition).client;

const baseURL = '127.0.0.1:50051'

const grpcServer = new grpc.Server();

function create (_, cb) {
    console.log('Requisição Create recebida')
    const client = _.request;
    clients.push(client);
    cb(null, client);
}

function findAll (_, cb) {
    console.log('Requisição FindAll recebida')
    cb(null, { clients });
}

function findOne (_, cb) {
    console.log('Requisição FindOne recebida')
    const id = _.request.id;
    const client = clients.find(client => client.id === id);
    if (client) {
        cb(null, client);
    } else {
        cb({
            code: grpc.status.NOT_FOUND
        });
    }
}

function deleteOne (_, cb) {
    console.log('Requisição DeleteOne recebida')
    const id = _.request.id;
    const client = clients.find(client => client.id === id);
    if (!client) {
        cb({
            code: grpc.status.NOT_FOUND
        });
    } 
    const index = clients.indexOf(client)
    clients.splice(index, 1)
    cb(null, client);
}


grpcServer.addService(clientProto.ClientService.service, {
    create: create,
    findAll: findAll,
    findOne: findOne,
    deleteOne: deleteOne
});

grpcServer.bindAsync(`${baseURL}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server rodando em ${baseURL}...`)
    grpcServer.start();
});

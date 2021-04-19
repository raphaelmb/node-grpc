const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./clients.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
   });
const {clients} = require('./mock');

const clientProto = grpc.loadPackageDefinition(packageDefinition).client;

const baseURL = '127.0.0.1:50051'

const grpcServer = new grpc.Server();

function create (_, cb) {
    console.log('Requisição de Create recebida')
    const client = _.request;
    clients.push(client);
    cb(null, client);
}

function findAll (_, cb) {
    console.log('Requisição de FindAll recebida')
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

grpcServer.addService(clientProto.ClientService.service, {
    create: create,
    findAll: findAll,
    findOne: findOne
});

grpcServer.bindAsync(`${baseURL}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server rodando em ${baseURL}...`)
    grpcServer.start();
});

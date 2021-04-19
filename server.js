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

grpcServer.addService(clientProto.ClientService.service, {
    create: () => {
        const client = _.request;
        clients.push(client);
        cb(null, { client });

    },
    findAll: (_, cb) => {
        cb(null, { clients });
    },
    findOne: (_, cb) => {
        const { id } = _.request;
        const client = mock.find(client => client.id === id);
        if (client) {
            cb(null, { client });
        } else {
            cb({
                code: grpc.status.NOT_FOUND
            });
        }
    }
});

grpcServer.bindAsync(`${baseURL}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server rodando em ${baseURL}...`)
    grpcServer.start();
});

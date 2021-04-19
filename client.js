const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./clients.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
 });
const clientProto = grpc.loadPackageDefinition(packageDefinition).client;

const baseURL = '127.0.0.1:50051'

const clientGrpc = new clientProto.ClientService(baseURL, grpc.credentials.createInsecure());

module.exports = clientGrpc;
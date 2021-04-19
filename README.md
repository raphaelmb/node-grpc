# gRPC com Node.js

A aplicação simula operações em uma lista de clientes utilizando gRPC para a comunição entre serviços.

## Instalação

É necessário que o [Node.js](https://nodejs.org/) esteja instalado. Clone o repositório e rode o seguinte comando na raiz do projeto:

```bash
npm install
```

## Uso

Inicie o servidor com o seguinte comando:

```bash
node server/server.js
```
Cada operação do client está separada em um arquivo próprio.

Para buscar todos os clientes:
```bash
node client/findAll.js
```
Para buscar um único cliente a partir de um id:

```bash
node client/findOne.js
```
Para criar um novo cliente:

```bash
node client/create.js
```
Para remover um cliente:
```bash
node client/deleteOne.js
```

## Detalhes

Os dados da aplicação estão mockados e estáticos apenas para fins de demonstração.
const grpc = require('@grpc/grpc-js')
const loader = require('@grpc/proto-loader')
const pkgDef = loader.loadSync('../protos/card_service.proto', {
  arrays: true,
  keepCase: true,
})
const grpcObj = grpc.loadPackageDefinition(pkgDef)
console.log(grpcObj)
const client = new grpcObj.trello.card_service.CardService('127.0.0.1:3011', grpc.credentials.createInsecure())
client.GetAllCardsOfCardlist({ cardlist_id: '65e5e4c837554a8c4f808af6' }, (err, res) => console.log(err, JSON.stringify(res)))

const grpc = require('@grpc/grpc-js')
const loader = require('@grpc/proto-loader')
const pkgDef = loader.loadSync('../protos/card.proto', {
  arrays: true,
  keepCase: true,
})
const grpcObj = grpc.loadPackageDefinition(pkgDef)

const client = new grpcObj.trello.card.CardService('localhost:3334', grpc.credentials.createInsecure())
client.GetAllCardsOfCardlist({ cardlist_id: '65dab6135c9001e72e5cdec8' }, (err, res) => console.log(err, JSON.stringify(res)))

const grpc = require('@grpc/grpc-js')
const loader = require('@grpc/proto-loader')
const pkgDef = loader.loadSync('../grpc/hello.proto', {})
const grpcObj = grpc.loadPackageDefinition(pkgDef)

const client = new grpcObj.hello.HelloService('localhost:3334', grpc.credentials.createInsecure())
client.EchoHello(
  {
    id: 1,
    name: 'lam',
  },
  (err, res) => console.log(err, res),
)

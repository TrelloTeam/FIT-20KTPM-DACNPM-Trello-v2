const webpack = require('webpack')

module.exports = function (options) {
  const { plugins, ...config } = options
  return {
    ...config,
    target: 'node',
    externals: [],
    plugins: [
      ...plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          const lazyImports = [
            '@nestjs/microservices',
            'cache-manager',
            'class-validator',
            'class-transformer',
            'class-transformer/storage',
            '@nestjs/websockets/socket-module',
            '@nestjs/microservices/microservices-module',
            '@nestjs/microservices/server',
            '@nestjs/microservices/client',

            'fastify-swagger',
          ]
          if (!lazyImports.includes(resource)) {
            return false
          }
          const path = process.cwd()
          try {
            require.resolve(resource, {
              paths: [path],
            })
          } catch (err) {
            console.log(resource)
            return true
          }
          return false
        },
      }),
    ],
  }
}

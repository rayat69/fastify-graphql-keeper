import fp from 'fastify-plugin'
import * as mongoose from 'mongoose'

export interface MongoosePluginOpts {
  url: string
  settings?: mongoose.ConnectOptions
}

const mongoosePlugin = fp<MongoosePluginOpts>(async (fastify, opts) => {
  await mongoose.connect(opts.url, opts.settings).then(() => {
    fastify.log.info('Database Connected')
  })

  const decorator = mongoose

  fastify.addHook('onClose', async (app, done) => {
    app.mongoose.connection.on('close', done)
    await app.mongoose.connection.close()
  })

  fastify.decorate('mongoose', decorator)
})

export default fp<MongoosePluginOpts>(async (fastify, opts) => {
  fastify.register(mongoosePlugin, {
    url: fastify.env.PUBLIC_DATABASE_CONNECTION,
    settings: opts.settings,
  })
})

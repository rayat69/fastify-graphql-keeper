import { join } from 'path'
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload'
import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import mercurius, { MercuriusLoaders } from 'mercurius'
import mercuriusCodegen, { loadSchemaFiles } from 'mercurius-codegen'
import { buildSchema } from 'graphql'
import * as mongoose from 'mongoose'

import { resolvers } from './graphql/resolvers'
import Label from './models/label'

declare module 'fastify' {
  interface FastifyInstance {
    env: {
      PUBLIC_DATABASE_CONNECTION: string
    }
    mongoose: typeof mongoose
  }
}

const schemaX = {
  type: 'object',
  properties: {
    PUBLIC_DATABASE_CONNECTION: {
      type: 'string',
    },
  },
}

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
  return {
    authorization: req.headers.authorization,
  }
}

const loaders: MercuriusLoaders = {
  Todo: {
    labels: async (queries, opts) => {
      const labelIds = queries.map(q => q.obj._id)
      const ls = await Label.find({ id: { $in: labelIds } })

      return ls.map(l => ({
        _id: l.id,
        name: l.name,
      })) as any
    },
  },
}

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T

declare module 'mercurius' {
  interface MercuriusContext
    extends PromiseType<ReturnType<typeof buildContext>> {}
}

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  const { schema } = loadSchemaFiles('src/graphql/schema/**/*.gql', {
    watchOptions: {
      enabled: process.env.NODE_ENV === 'development',
      onChange(schema) {
        fastify.graphql.replaceSchema(buildSchema(schema.join('\n')))
        fastify.graphql.defineResolvers(resolvers)

        mercuriusCodegen(fastify, {
          targetPath: './src/graphql/generated.ts',
          operationsGlob: './src/graphql/operations/*.gql',
          codegenConfig: {
            resolverTypeWrapperSignature:
              'Promise<T> | T | (() => Promise<T>) | (() => T)',
          },
        }).catch(console.error)
      },
    },
  })
  // Place here your custom code!

  await fastify.register(import('fastify-env'), {
    confKey: 'env',
    prefix: 'PUBLIC',
    schema: schemaX,
    dotenv: true,
  })

  // void fastify.register(FastifyMongoosePlugin, {
  //   url: fastify.env.PUBLIC_DATABASE_CONNECTION,
  //   settings: {
  //     useNewUrlParser: true,
  //   },
  // })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  })

  void fastify.register(mercurius, {
    schema,
    resolvers,
    loaders,
    context: buildContext,
    subscription: true,
    graphiql: true,
  })

  mercuriusCodegen(fastify, {
    targetPath: './src/graphql/generated.ts',
    operationsGlob: './src/graphql/operations/*.gql',
    codegenConfig: {
      resolverTypeWrapperSignature:
        'Promise<T> | T | (() => Promise<T>) | (() => T)',
    },
    watchOptions: {
      enabled: process.env.NODE_ENV === 'development',
    },
  }).catch(console.error)
}

export default app
export { app }

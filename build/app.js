"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const path_1 = require("path");
const fastify_autoload_1 = require("fastify-autoload");
const mercurius_1 = require("mercurius");
const mercurius_codegen_1 = require("mercurius-codegen");
const graphql_1 = require("graphql");
const resolvers_1 = require("./graphql/resolvers");
const label_1 = require("./models/label");
const schemaX = {
    type: 'object',
    properties: {
        PUBLIC_DATABASE_CONNECTION: {
            type: 'string',
        },
    },
};
const buildContext = async (req, _reply) => {
    return {
        authorization: req.headers.authorization,
    };
};
const loaders = {
    Todo: {
        labels: async (queries, opts) => {
            const labelIds = queries.map(q => q.obj._id);
            const ls = await label_1.default.find({ id: { $in: labelIds } });
            return ls.map(l => ({
                _id: l.id,
                name: l.name,
            }));
        },
    },
};
const app = async (fastify, opts) => {
    const { schema } = (0, mercurius_codegen_1.loadSchemaFiles)('src/graphql/schema/**/*.gql', {
        watchOptions: {
            enabled: process.env.NODE_ENV === 'development',
            onChange(schema) {
                fastify.graphql.replaceSchema((0, graphql_1.buildSchema)(schema.join('\n')));
                fastify.graphql.defineResolvers(resolvers_1.resolvers);
                (0, mercurius_codegen_1.default)(fastify, {
                    targetPath: './src/graphql/generated.ts',
                    operationsGlob: './src/graphql/operations/*.gql',
                    codegenConfig: {
                        resolverTypeWrapperSignature: 'Promise<T> | T | (() => Promise<T>) | (() => T)',
                    },
                }).catch(console.error);
            },
        },
    });
    await fastify.register(Promise.resolve().then(() => require('fastify-env')), {
        confKey: 'env',
        prefix: 'PUBLIC',
        schema: schemaX,
        dotenv: true,
    });
    void fastify.register(fastify_autoload_1.default, {
        dir: (0, path_1.join)(__dirname, 'plugins'),
        options: opts,
    });
    void fastify.register(fastify_autoload_1.default, {
        dir: (0, path_1.join)(__dirname, 'routes'),
        options: opts,
    });
    void fastify.register(mercurius_1.default, {
        schema,
        resolvers: resolvers_1.resolvers,
        loaders,
        context: buildContext,
        subscription: true,
        graphiql: true,
    });
    (0, mercurius_codegen_1.default)(fastify, {
        targetPath: './src/graphql/generated.ts',
        operationsGlob: './src/graphql/operations/*.gql',
        codegenConfig: {
            resolverTypeWrapperSignature: 'Promise<T> | T | (() => Promise<T>) | (() => T)',
        },
        watchOptions: {
            enabled: process.env.NODE_ENV === 'development',
        },
    }).catch(console.error);
};
exports.app = app;
exports.default = app;

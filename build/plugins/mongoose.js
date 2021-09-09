"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = require("fastify-plugin");
const mongoose = require("mongoose");
const mongoosePlugin = (0, fastify_plugin_1.default)(async (fastify, opts) => {
    await mongoose.connect(opts.url, opts.settings).then(() => {
        fastify.log.info('Database Connected');
    });
    const decorator = mongoose;
    fastify.addHook('onClose', async (app, done) => {
        app.mongoose.connection.on('close', done);
        await app.mongoose.connection.close();
    });
    fastify.decorate('mongoose', decorator);
});
exports.default = (0, fastify_plugin_1.default)(async (fastify, opts) => {
    fastify.register(mongoosePlugin, {
        url: fastify.env.PUBLIC_DATABASE_CONNECTION,
        settings: opts.settings,
    });
});

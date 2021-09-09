/// <reference types="node" />
import * as mongoose from 'mongoose';
export interface MongoosePluginOpts {
    url: string;
    settings?: mongoose.ConnectOptions;
}
declare const _default: import("fastify").FastifyPluginAsync<MongoosePluginOpts, import("http").Server>;
export default _default;

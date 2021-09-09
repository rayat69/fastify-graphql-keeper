import { AutoloadPluginOptions } from 'fastify-autoload';
import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import * as mongoose from 'mongoose';
declare module 'fastify' {
    interface FastifyInstance {
        env: {
            PUBLIC_DATABASE_CONNECTION: string;
        };
        mongoose: typeof mongoose;
    }
}
export declare type AppOptions = {} & Partial<AutoloadPluginOptions>;
declare const buildContext: (req: FastifyRequest, _reply: FastifyReply) => Promise<{
    authorization: string | undefined;
}>;
declare type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;
declare module 'mercurius' {
    interface MercuriusContext extends PromiseType<ReturnType<typeof buildContext>> {
    }
}
declare const app: FastifyPluginAsync<AppOptions>;
export default app;
export { app };

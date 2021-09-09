"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const todo_1 = require("../../models/todo");
const label_1 = require("../../models/label");
exports.resolvers = {
    Todo: {
        labels: async (todo, arg, ctx, __) => {
            const ls = await label_1.default.find({ id: { $in: todo.labels.map(l => l._id) } });
            return ls.map(l => ({
                _id: l.id,
                name: l.name,
            }));
        },
    },
    Label: {
        todos: async (label, arg, ctx, __) => {
            const todos = await todo_1.default.find({ labels: { $in: [label] } });
            return todos.map(t => ({
                _id: t.id,
                color: t.color,
                title: t.title,
                isChechBoxMode: t.isChechBoxMode,
                createdAt: t.createdAt,
                notes: t.notes,
                labels: t.labels,
            }));
        },
    },
    Query: {
        todos: async (_, arg, ctx, __) => {
            try {
                const todos = await todo_1.default.find();
                return todos.map(t => ({
                    _id: t.id,
                    color: t.color,
                    title: t.title,
                    isChechBoxMode: t.isChechBoxMode,
                    createdAt: t.createdAt,
                    notes: t.notes,
                    labels: t.labels,
                }));
            }
            catch (error) {
                throw error;
            }
        },
        async labels(_, arg, ctx, __) {
            const ls = await label_1.default.find();
            return ls.map(l => ({
                _id: l.id,
                name: l.name,
            }));
        },
    },
    Mutation: {},
};

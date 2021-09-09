"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    notes: [
        {
            text: {
                type: String,
                required: true,
            },
            isCompleted: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
    ],
    labels: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'labels',
        },
    ],
    color: {
        type: String,
        required: true,
        default: '#fafafa',
    },
    isChechBoxMode: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: String,
        required: true,
        default: new Date().toISOString,
    },
});
const todoModel = (0, mongoose_1.model)('todos', todoSchema);
exports.default = todoModel;

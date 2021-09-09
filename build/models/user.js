"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    todos: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'todos',
        },
    ],
    labels: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'labels',
        },
    ],
    listMode: {
        type: Boolean,
        required: true,
        default: false,
    },
    darkMode: {
        type: Boolean,
        required: true,
        default: false,
    },
});
const userModel = (0, mongoose_1.model)('users', userSchema);
exports.default = userModel;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const labelSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
});
const labelModel = (0, mongoose_1.model)('labels', labelSchema);
exports.default = labelModel;

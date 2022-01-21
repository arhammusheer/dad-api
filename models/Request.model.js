"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RequestSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
        default: new Date(Date.now()),
    },
    origin: {
        ip: {
            type: String,
            required: true,
        },
        user_agent: {
            type: String,
            required: true,
        },
    },
    url: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    invoiced: {
        type: Boolean,
        required: true,
        default: false,
    },
});
const RequestModel = (0, mongoose_1.model)("Request", RequestSchema);
exports.default = RequestModel;
//# sourceMappingURL=Request.model.js.map
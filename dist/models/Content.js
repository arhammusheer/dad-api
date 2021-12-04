"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const JokeSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
        default: new Date(Date.now()),
    },
    date_updated: {
        type: Date,
        default: new Date(Date.now()),
    },
});
//# sourceMappingURL=Content.js.map
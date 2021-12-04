"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ContentSchema = new mongoose_1.Schema({
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
const ContentModel = mongoose_1.model("Content", ContentSchema);
exports.default = ContentModel;
//# sourceMappingURL=Content.js.map
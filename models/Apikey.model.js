"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const ApikeySchema = new mongoose_1.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    date_created: {
        type: Date,
        default: new Date(Date.now()),
    },
    date_expired: {
        type: Date,
        default: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
    },
    user_id: {
        type: String,
        required: true,
    },
});
const ApikeyModel = (0, mongoose_1.model)("Apikey", ApikeySchema);
exports.default = ApikeyModel;
//# sourceMappingURL=Apikey.model.js.map
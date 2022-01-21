"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password_hash: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: new Date(Date.now()),
    },
    updated_at: {
        type: Date,
        default: new Date(Date.now()),
    },
    totp_secret: {
        type: String,
        required: false,
    },
    totp_enabled: {
        type: Boolean,
        required: false,
        default: false,
    },
    totp_verified: {
        type: Boolean,
        required: false,
        default: false,
    },
    email_verified: {
        type: Boolean,
        required: false,
        default: false,
    },
});
const UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.default = UserModel;
//# sourceMappingURL=User.model.js.map
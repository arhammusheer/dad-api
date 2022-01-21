"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const InvoiceSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
        required: true,
        default: new Date(Date.now()),
    },
    date_paid: {
        type: Date,
        required: false,
        default: null,
    },
    request_ids: {
        type: [String],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "pending",
    },
});
const InvoiceModel = (0, mongoose_1.model)("Invoice", InvoiceSchema);
exports.default = InvoiceModel;
//# sourceMappingURL=Invoice.model.js.map
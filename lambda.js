"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const handler = (0, serverless_http_1.default)(app_1.default);
module.exports = { handler };
//# sourceMappingURL=lambda.js.map
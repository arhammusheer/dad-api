"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const JokeSchema = new mongoose_1.Schema({
    joke: {
        type: String,
        required: true,
    },
});
//# sourceMappingURL=Joke.js.map
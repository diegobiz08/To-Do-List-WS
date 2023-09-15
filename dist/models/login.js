"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const loginSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: Boolean,
        default: false,
    },
});
exports.default = (0, mongoose_1.model)('Login', loginSchema);

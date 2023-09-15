"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    products: [{ type: mongoose_1.Types.ObjectId, ref: 'Product' }],
    total: String,
});
exports.default = (0, mongoose_1.model)('Cart', cartSchema);

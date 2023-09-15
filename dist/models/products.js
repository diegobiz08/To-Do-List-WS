"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productsSchema = new mongoose_1.Schema({
    name: String,
    brand: String,
    stockAvailable: String,
    discount: String,
    discountPrice: String,
    picture: String,
    description: String,
    category: [String],
});
exports.default = (0, mongoose_1.model)('Product', productsSchema);

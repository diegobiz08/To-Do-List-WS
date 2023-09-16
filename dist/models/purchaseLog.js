"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const purchaseLogSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true }],
    purchaseDate: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('PurchaseLog', purchaseLogSchema);

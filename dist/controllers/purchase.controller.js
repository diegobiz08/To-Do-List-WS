"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePurchase = exports.handleBadRequest = exports.handleServerError = void 0;
const products_1 = __importDefault(require("../models/products"));
const purchaseLog_1 = __importDefault(require("../models/purchaseLog"));
const commons_1 = require("../utils/commons");
const handleServerError = (res, error, errorMessage) => {
    res.status(500).json({ error: errorMessage });
};
exports.handleServerError = handleServerError;
const handleBadRequest = (res, message) => {
    res.status(400).json({ msg: message });
};
exports.handleBadRequest = handleBadRequest;
const makePurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = '';
    try {
        const { selectedProducts } = req.body;
        if (!selectedProducts || selectedProducts.length === 0) {
            return (0, exports.handleBadRequest)(res, commons_1.DATA_REQUIRED);
        }
        const products = yield products_1.default.find({ _id: { $in: selectedProducts } });
        for (const product of products) {
            if (product.stockAvailable == '1') {
                return (0, exports.handleBadRequest)(res, 'Uno o más productos no están disponibles en el inventario.');
            }
        }
        for (const product of products) {
            product.stockAvailable = (parseFloat(product.stockAvailable) - 1).toString();
            yield product.save();
        }
        const purchaseLog = new purchaseLog_1.default({
            userId,
            products: selectedProducts,
        });
        yield purchaseLog.save();
        res.json({ message: 'Compra realizada con éxito', purchaseLog });
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.CREATE_ERROR);
    }
});
exports.makePurchase = makePurchase;

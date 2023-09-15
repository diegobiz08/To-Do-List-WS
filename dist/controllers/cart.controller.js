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
exports.createCart = exports.handleBadRequest = exports.handleServerError = void 0;
const cart_1 = __importDefault(require("../models/cart"));
const products_1 = __importDefault(require("../models/products"));
const commons_1 = require("../utils/commons");
const handleServerError = (res, error, errorMessage) => {
    res.status(500).json({ error: errorMessage });
};
exports.handleServerError = handleServerError;
const handleBadRequest = (res, message) => {
    res.status(400).json({ msg: message });
};
exports.handleBadRequest = handleBadRequest;
const createCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, selectedProducts } = req.body;
        if (!userId || !selectedProducts || selectedProducts.length === 0) {
            return (0, exports.handleBadRequest)(res, commons_1.DATA_REQUIRED);
        }
        const totalPrice = yield calculateTotalPrice(selectedProducts);
        const newCart = new cart_1.default({
            userId,
            products: selectedProducts,
            total: totalPrice,
        });
        yield newCart.save();
        res.status(201).json(newCart);
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.CREATE_ERROR);
    }
});
exports.createCart = createCart;
function calculateTotalPrice(selectedProducts) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield products_1.default.find({ _id: { $in: selectedProducts } });
        let totalPrice = 0;
        for (const product of products) {
            totalPrice += parseFloat(product.discountPrice);
        }
        return totalPrice;
    });
}

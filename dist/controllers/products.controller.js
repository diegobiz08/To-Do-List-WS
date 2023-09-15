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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProducts = exports.handleBadRequest = exports.handleServerError = void 0;
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
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield products_1.default.find();
        res.json(items);
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.FOUND_ERROR);
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, brand, stockAvailable, discount, discountPrice, picture, description, category, } = req.body;
        if (!name || !brand || !stockAvailable || !discount || !discountPrice) {
            return (0, exports.handleBadRequest)(res, commons_1.DATA_REQUIRED);
        }
        const newProduct = new products_1.default({
            name,
            brand,
            stockAvailable,
            discount,
            discountPrice,
            picture,
            description,
            category,
        });
        yield newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.CREATE_ERROR);
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingProduct = yield products_1.default.findById(id);
        if (!existingProduct) {
            return (0, exports.handleBadRequest)(res, commons_1.NOT_EXIST);
        }
        const { name, brand, stockAvailable, discount, discountPrice, picture, description, category, } = req.body;
        existingProduct.name = name || existingProduct.name;
        existingProduct.brand = brand || existingProduct.brand;
        existingProduct.stockAvailable = stockAvailable || existingProduct.stockAvailable;
        existingProduct.discount = discount || existingProduct.discount;
        existingProduct.discountPrice = discountPrice || existingProduct.discountPrice;
        existingProduct.picture = picture || existingProduct.picture;
        existingProduct.description = description || existingProduct.description;
        existingProduct.category = category || existingProduct.category;
        yield existingProduct.save();
        res.json(existingProduct);
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.UPDATE_ERROR);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingProduct = yield products_1.default.findById(id);
        if (!existingProduct) {
            return (0, exports.handleBadRequest)(res, commons_1.NOT_EXIST);
        }
        yield existingProduct.remove();
        res.json({ message: commons_1.PRODUCT_DELETE });
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.DELETE_ERROR);
    }
});
exports.deleteProduct = deleteProduct;

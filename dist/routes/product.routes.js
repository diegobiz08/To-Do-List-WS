"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get('/api/productos', passport_1.default.authenticate('jwt', { session: false }), products_controller_1.getProducts);
router.post('/api/productos', passport_1.default.authenticate('jwt', { session: false }), products_controller_1.createProduct);
router.put('/api/productos/:id', passport_1.default.authenticate('jwt', { session: false }), products_controller_1.updateProduct);
router.delete('/api/productos/:id', passport_1.default.authenticate('jwt', { session: false }), products_controller_1.deleteProduct);
exports.default = router;

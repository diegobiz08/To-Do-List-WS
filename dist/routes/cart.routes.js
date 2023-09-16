"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post('/api/carrito', passport_1.default.authenticate('jwt', { session: false }), cart_controller_1.createCart);
router.delete('/api/carrito', passport_1.default.authenticate('jwt', { session: false }), cart_controller_1.deleteProductFromCart);
router.get('/api/carrito', passport_1.default.authenticate('jwt', { session: false }), cart_controller_1.getCartDetails);
exports.default = router;

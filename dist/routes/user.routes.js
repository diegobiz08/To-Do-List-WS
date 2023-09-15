"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const profile_controller_1 = require("../controllers/profile.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post('/api/registro/:DPI', user_controller_1.signUp);
router.post('/api/login', user_controller_1.signIn);
router.get('/api/perfil/:DPI', passport_1.default.authenticate('jwt', { session: false }), profile_controller_1.getProfileByDPI);
router.put('/api/perfil/:DPI', passport_1.default.authenticate('jwt', { session: false }), profile_controller_1.updateByDPI);
exports.default = router;

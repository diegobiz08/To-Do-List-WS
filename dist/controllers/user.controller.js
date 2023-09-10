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
exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const commons_1 = require("../utils/commons");
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, dbConfig_1.default.jwtSecret, {
        expiresIn: 9999,
    });
}
function handleBadRequest(res, message) {
    return res.status(400).json({ msg: message });
}
function handleInternalServerError(res, message) {
    return res.status(500).json({ msg: message });
}
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return handleBadRequest(res, commons_1.LOGIN_REQUIREMENTS);
    }
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return handleBadRequest(res, commons_1.USER_EXISTS);
        }
        const newUser = new user_1.default({ email, password });
        yield newUser.save();
        return res.status(201).json(newUser);
    }
    catch (error) {
        return handleInternalServerError(res, commons_1.LOGIN_ERROR);
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return handleBadRequest(res, commons_1.LOGIN_REQUIREMENTS);
    }
    try {
        const [user] = yield Promise.all([user_1.default.findOne({ email: email })]);
        if (!user) {
            return handleBadRequest(res, commons_1.USER_NOT_EXISTS);
        }
        const exists = yield user.comparePassword(password);
        if (exists) {
            const token = createToken(user);
            return res.status(200).json({ token });
        }
        else {
            return handleBadRequest(res, commons_1.LOGIN_ERROR);
        }
    }
    catch (error) {
        return handleInternalServerError(res, commons_1.LOGIN_ERROR);
    }
});
exports.signIn = signIn;

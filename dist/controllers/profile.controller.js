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
exports.deleteTask = exports.createTask = exports.getItemById = exports.updateByDPI = exports.getProfileByDPI = exports.handleBadRequest = exports.handleServerError = void 0;
const task_1 = __importDefault(require("../models/task"));
const user_1 = __importDefault(require("../models/user"));
const commons_1 = require("../utils/commons");
const handleServerError = (res, error, errorMessage) => {
    res.status(500).json({ error: errorMessage });
};
exports.handleServerError = handleServerError;
const handleBadRequest = (res, message) => {
    res.status(400).json({ msg: message });
};
exports.handleBadRequest = handleBadRequest;
const getProfileByDPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { DPI } = req.params;
    try {
        const item = yield user_1.default.findOne({ DPI });
        if (!item) {
            res.status(404).json({ error: commons_1.NOT_EXIST });
            return;
        }
        res.json(item);
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.FOUND_ERROR);
    }
});
exports.getProfileByDPI = getProfileByDPI;
const updateByDPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, NIT, name, lastName, bornDate, deliveryAddress, phoneNumber } = req.body;
    const { DPI } = req.params;
    if (!email || !password || !DPI || !NIT || !name || !lastName || !bornDate || !deliveryAddress || !phoneNumber) {
        return (0, exports.handleBadRequest)(res, commons_1.LOGIN_REQUIREMENTS);
    }
    try {
        const existingEmail = yield user_1.default.findOne({ email });
        const existingNIT = yield user_1.default.findOne({ NIT });
        if (existingEmail && existingEmail.DPI !== DPI) {
            return (0, exports.handleBadRequest)(res, commons_1.EXISTING_EMAIL);
        }
        if (existingNIT && existingNIT.DPI !== DPI) {
            return (0, exports.handleBadRequest)(res, commons_1.EXISTING_NIT);
        }
        const updateFields = {
            email,
            password,
            NIT,
            name,
            lastName,
            bornDate,
            deliveryAddress,
            phoneNumber
        };
        const updatedItem = yield user_1.default.findOneAndUpdate({ DPI }, { $set: updateFields }, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ error: commons_1.NOT_EXIST });
        }
        return res.json(updatedItem);
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.UPDATE_ERROR);
    }
});
exports.updateByDPI = updateByDPI;
const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const item = yield task_1.default.findById(id);
        if (!item) {
            res.status(404).json({ error: commons_1.NOT_EXIST });
            return;
        }
        res.json(item);
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.FOUND_ERROR);
    }
});
exports.getItemById = getItemById;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, completed } = req.body;
    const user = req.user;
    const createdBy = user._id;
    try {
        const newItem = new task_1.default({ description, completed, createdBy });
        yield newItem.save();
        res.status(201).json(newItem);
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.CREATE_ERROR);
    }
});
exports.createTask = createTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedItem = yield task_1.default.findByIdAndRemove(id);
        if (!deletedItem) {
            res.status(404).json({ error: commons_1.NOT_EXIST });
            return;
        }
        res.json({ message: commons_1.TASK_DELETED });
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.DELETE_ERROR);
    }
});
exports.deleteTask = deleteTask;

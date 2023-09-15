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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getItemById = exports.getItems = exports.handleServerError = void 0;
const task_1 = __importDefault(require("../models/task"));
const commons_1 = require("../utils/commons");
const handleServerError = (res, error, errorMessage) => {
    console.error(error);
    res.status(500).json({ error: errorMessage });
};
exports.handleServerError = handleServerError;
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const userId = user._id;
    try {
        const userTasks = yield task_1.default.find({ createdBy: userId });
        res.json(userTasks);
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.FOUND_ERROR);
    }
});
exports.getItems = getItems;
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
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { description, completed } = req.body;
    try {
        const updatedItem = yield task_1.default.findByIdAndUpdate(id, { description, completed }, { new: true });
        if (!updatedItem) {
            res.status(404).json({ error: commons_1.NOT_EXIST });
            return;
        }
        res.json(updatedItem);
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.UPDATE_ERROR);
    }
});
exports.updateTask = updateTask;
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

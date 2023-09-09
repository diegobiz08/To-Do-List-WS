"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
router.post("/tasks/", passport_1.default.authenticate('jwt', { session: false }), taskController_1.createTask);
router.get('/tasks/getAll', passport_1.default.authenticate('jwt', { session: false }), taskController_1.getItems);
router.get('/tasks/getById/:id', passport_1.default.authenticate('jwt', { session: false }), taskController_1.getItemById);
router.delete("/tasks/:id", passport_1.default.authenticate('jwt', { session: false }), taskController_1.deleteTask);
router.put("/tasks/:id", passport_1.default.authenticate('jwt', { session: false }), taskController_1.updateTask);
exports.default = router;

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
const mongoose_1 = __importDefault(require("mongoose"));
const taskController_1 = require("../controllers/taskController");
const task_1 = __importDefault(require("../models/task"));
const commons_1 = require("../utils/commons");
describe('createTask', () => {
    let req;
    let res;
    let jsonMock;
    beforeEach(() => {
        req = {
            body: {
                description: 'Test Task',
                completed: false
            },
            user: {
                _id: "453523454"
            },
        };
        jsonMock = jest.fn();
        res = {
            status: jest.fn(() => res),
            json: jsonMock,
        };
    });
    it('Create a new Task and validate returned status created', () => __awaiter(void 0, void 0, void 0, function* () {
        const newItem = {
            _id: new mongoose_1.default.Types.ObjectId(),
            description: 'Test Task',
            completed: false,
        };
        task_1.default.prototype.save = jest.fn().mockResolvedValue(newItem);
        yield (0, taskController_1.createTask)(req, res);
        expect(task_1.default.prototype.save).toHaveBeenCalledWith();
        expect(res.status).toHaveBeenCalledWith(201);
    }));
    it('Get an error trying to create a new task', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new Error('Test error');
        task_1.default.prototype.save = jest.fn().mockRejectedValue(error);
        yield (0, taskController_1.createTask)(req, res);
        expect(task_1.default.prototype.save).toHaveBeenCalledWith();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ error: commons_1.CREATE_ERROR });
    }));
});

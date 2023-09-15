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
const taskController_1 = require("../controllers/taskController");
const task_1 = __importDefault(require("../models/task"));
const commons_1 = require("../utils/commons");
describe('deleteTask', () => {
    let req;
    let res;
    let jsonMock;
    beforeEach(() => {
        req = {
            params: {
                id: 'mockedObjectId',
            },
        };
        jsonMock = jest.fn();
        res = {
            status: jest.fn(() => res),
            json: jsonMock,
        };
    });
    it('should delete a task and return a success message', () => __awaiter(void 0, void 0, void 0, function* () {
        const findByIdAndRemoveMock = jest.fn().mockResolvedValue({
            _id: 'mockedObjectId',
            description: 'Test Task',
            completed: false,
        });
        task_1.default.findByIdAndRemove = findByIdAndRemoveMock;
        yield (0, taskController_1.deleteTask)(req, res);
        expect(findByIdAndRemoveMock).toHaveBeenCalledWith('mockedObjectId');
        expect(jsonMock).toHaveBeenCalledWith({ message: commons_1.TASK_DELETED });
    }));
    it('should handle server error', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new Error('Test error');
        task_1.default.findByIdAndRemove = jest.fn().mockRejectedValue(error);
        yield (0, taskController_1.deleteTask)(req, res);
        expect(task_1.default.findByIdAndRemove).toHaveBeenCalledWith('mockedObjectId');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ error: commons_1.DELETE_ERROR });
    }));
});

import { Request, Response } from 'express';
import mongoose from 'mongoose';
import {
    createTask,
    handleServerError,
} from '../controllers/taskController';
import Task from '../models/task';
import { CREATE_ERROR } from '../utils/commons';

describe('createTask', () => {
    let req: Partial<Request>;
    let res: Response;
    let jsonMock: jest.Mock;

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
        res = ({
            status: jest.fn(() => res),
            json: jsonMock,
        } as unknown) as Response;
    });

    it('Create a new Task and validate returned status created', async () => {
        const newItem = {
            _id: new mongoose.Types.ObjectId(),
            description: 'Test Task',
            completed: false,
        };

        Task.prototype.save = jest.fn().mockResolvedValue(newItem);

        await createTask(req as Request, res as Response);

        expect(Task.prototype.save).toHaveBeenCalledWith();

        expect(res.status).toHaveBeenCalledWith(201);
    });

    it('Get an error trying to create a new task', async () => {
        const error = new Error('Test error');

        Task.prototype.save = jest.fn().mockRejectedValue(error);

        await createTask(req as Request, res as Response);

        expect(Task.prototype.save).toHaveBeenCalledWith();

        expect(res.status).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ error: CREATE_ERROR });
    });
});

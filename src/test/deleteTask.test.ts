import { Request, Response } from 'express';
import mongoose from 'mongoose';
import {
    deleteTask,
    handleServerError,
} from '../controllers/taskController';
import Task from '../models/task';
import { DELETE_ERROR, TASK_DELETED } from '../utils/commons';

describe('deleteTask', () => {
    let req: Partial<Request>;
    let res: Response;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        req = {
            params: {
                id: 'mockedObjectId',
            },
        };
        jsonMock = jest.fn();
        res = ({
            status: jest.fn(() => res),
            json: jsonMock,
        } as unknown) as Response;
    });

    it('should delete a task and return a success message', async () => {
        const findByIdAndRemoveMock = jest.fn().mockResolvedValue({
            _id: 'mockedObjectId',
            description: 'Test Task',
            completed: false,
        });

        Task.findByIdAndRemove = findByIdAndRemoveMock;

        await deleteTask(req as Request, res as Response);

        expect(findByIdAndRemoveMock).toHaveBeenCalledWith('mockedObjectId');
        expect(jsonMock).toHaveBeenCalledWith({ message: TASK_DELETED });
    });

    it('should handle server error', async () => {
        const error = new Error('Test error');

        Task.findByIdAndRemove = jest.fn().mockRejectedValue(error);

        await deleteTask(req as Request, res as Response);

        expect(Task.findByIdAndRemove).toHaveBeenCalledWith('mockedObjectId');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ error: DELETE_ERROR });
    });
});

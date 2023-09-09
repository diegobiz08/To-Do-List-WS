import { Request, Response } from 'express';
import Task, { ITask } from '../models/task';
import {
    FOUND_ERROR,
    CREATE_ERROR,
    NOT_EXIST,
    DELETE_ERROR,
    UPDATE_ERROR,
    TASK_DELETED,
} from '../utils/commons';


const handleServerError = (res: Response, error: any, errorMessage: string) => {
    console.error(error);
    res.status(500).json({ error: errorMessage });
};


export const getItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await Task.find();
        res.json(items);
    } catch (error) {
        handleServerError(res, error, FOUND_ERROR);
    }
};

export const getItemById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const item = await Task.findById(id);
        if (!item) {
            res.status(404).json({ error: NOT_EXIST });
            return;
        }
        res.json(item);
    } catch (error) {
        handleServerError(res, error, FOUND_ERROR);
    }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
    const { description, completed } = req.body;
    try {
        const newItem: ITask = new Task({ description, completed });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        handleServerError(res, error, CREATE_ERROR);
    }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { description, completed } = req.body;
    try {
        const updatedItem = await Task.findByIdAndUpdate(id, { description, completed }, { new: true });
        if (!updatedItem) {
            res.status(404).json({ error: NOT_EXIST });
            return;
        }
        res.json(updatedItem);
    } catch (error) {
        handleServerError(res, error, UPDATE_ERROR);
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedItem = await Task.findByIdAndRemove(id);
        if (!deletedItem) {
            res.status(404).json({ error: NOT_EXIST });
            return;
        }
        res.json({ message: TASK_DELETED });
    } catch (error) {
        handleServerError(res, error, DELETE_ERROR);
    }
};

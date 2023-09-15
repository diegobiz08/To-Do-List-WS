import { Request, Response } from 'express';
import Task, { ITask } from '../models/task';
import User from '../models/user';
import {
    FOUND_ERROR,
    CREATE_ERROR,
    NOT_EXIST,
    DELETE_ERROR,
    UPDATE_ERROR,
    TASK_DELETED,
    EXISTING_EMAIL,
    EXISTING_NIT,
    EXISTING_DPI,
    LOGIN_REQUIREMENTS,

} from '../utils/commons';
import {IUser} from '../models/user';

export const handleServerError = (res: Response, error: any, errorMessage: string) => {
    res.status(500).json({ error: errorMessage });
};

export const handleBadRequest = (res: Response, message: string) => {
    res.status(400).json({ msg: message });
}

export const getProfileByDPI = async (req: Request, res: Response): Promise<void> => {
    const { DPI } = req.params;
    try {
        const item = await User.findOne({ DPI });
        if (!item) {
            res.status(404).json({ error: NOT_EXIST });
            return;
        }
        res.json(item);
    } catch (error) {
        handleServerError(res, error, FOUND_ERROR);
    }
};

export const updateByDPI = async (req: Request, res: Response) => {
    const {
        email,
        password,
        NIT,
        name,
        lastName,
        bornDate,
        deliveryAddress,
        phoneNumber
    } = req.body;

    const { DPI } = req.params;

    if (!email || !password || !DPI || !NIT || !name || !lastName || !bornDate || !deliveryAddress || !phoneNumber) {
        return handleBadRequest(res, LOGIN_REQUIREMENTS);
    }

    try {
        const existingEmail = await User.findOne({ email });
        const existingNIT = await User.findOne({ NIT });

        if (existingEmail && existingEmail.DPI !== DPI) {
            return handleBadRequest(res, EXISTING_EMAIL);
        }

        if (existingNIT && existingNIT.DPI !== DPI) {
            return handleBadRequest(res, EXISTING_NIT);
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

        const updatedItem = await User.findOneAndUpdate({ DPI }, { $set: updateFields }, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ error: NOT_EXIST });
        }

        return res.json(updatedItem);
    } catch (error) {
        handleServerError(res, error, UPDATE_ERROR);
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
    const user = req.user as IUser;
    const createdBy = user._id;

    try {
        const newItem: ITask = new Task({ description, completed, createdBy });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        handleServerError(res, error, CREATE_ERROR);
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

import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config/dbConfig';
import {LOGIN_ERROR, LOGIN_REQUIREMENTS, NOT_EXIST, USER_EXISTS, USER_NOT_EXISTS} from '../utils/commons';

function createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 9999,
    });
}

function handleBadRequest(res: Response, message: string) {
    return res.status(400).json({ msg: message });
}

function handleInternalServerError(res: Response, message: string) {
    return res.status(500).json({ msg: message });
}

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
        return handleBadRequest(res, LOGIN_REQUIREMENTS);
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return handleBadRequest(res, USER_EXISTS);
        }

        const newUser = new User({ email, password });
        await newUser.save();

        return res.status(201).json(newUser);
    } catch (error) {
        return handleInternalServerError(res, LOGIN_ERROR);
    }
};


export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return handleBadRequest(res, LOGIN_REQUIREMENTS);
    }

    try {
        const [user] = await Promise.all([User.findOne({email: email})]);

        if (!user) {
            return handleBadRequest(res, USER_NOT_EXISTS);
        }

        const exists = await user.comparePassword(password);

        if (exists) {
            const token = createToken(user);
            return res.status(200).json({ token });
        } else {
            return handleBadRequest(res, LOGIN_ERROR);
        }
    } catch (error) {
        return handleInternalServerError(res, LOGIN_ERROR);
    }
}

import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config/dbConfig';
import {
    LOGIN_REQUIREMENTS,
    NOT_EXIST,
    USER_EXISTS,
    USER_NOT_EXISTS,
    EXISTING_EMAIL,
    EXISTING_NIT,
    EXISTING_DPI,
    LOGIN_ERROR,
    PASSWORD_NOT_MATCH,
    SERVER_ERROR
} from '../utils/commons';

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
    const {
        email,
        password,
        passwordConfirmation,
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
        const existingDPI = await User.findOne({ DPI });

        if (existingEmail) {
            return handleBadRequest(res, EXISTING_EMAIL);
        }

        if (existingNIT) {
            return handleBadRequest(res, EXISTING_NIT);
        }

        if (existingDPI) {
            return handleBadRequest(res, EXISTING_DPI);
        }

        const newUser = new User({
            email,
            password,
            passwordConfirmation,
            DPI,
            NIT,
            name,
            lastName,
            bornDate,
            deliveryAddress,
            phoneNumber
        });

        await newUser.save();

        return res.status(201).json(newUser);
    }  catch (error) {
        console.log('ERROR CREADO POR: ', error);
        return handleInternalServerError(res, SERVER_ERROR);
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
        console.log('ERROR CREADO POR: ', error);
        return handleInternalServerError(res, SERVER_ERROR);
    }
    
    
    
}

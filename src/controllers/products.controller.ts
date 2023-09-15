import { Request, Response } from 'express';
import Product, { IProducts } from '../models/products';
import {
    FOUND_ERROR,
    CREATE_ERROR,
    NOT_EXIST,
    DELETE_ERROR,
    UPDATE_ERROR,
    USER_DELETED,
    EXISTING_EMAIL,
    EXISTING_NIT,
    EXISTING_DPI,
    LOGIN_REQUIREMENTS,
    DATA_REQUIRED,
    PRODUCT_DELETE

} from '../utils/commons';

export const handleServerError = (res: Response, error: any, errorMessage: string) => {
    res.status(500).json({ error: errorMessage });
};

export const handleBadRequest = (res: Response, message: string) => {
    res.status(400).json({ msg: message });
}

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await Product.find();
        res.json(items);
    } catch (error) {
        handleServerError(res, error, FOUND_ERROR);
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            name,
            brand,
            stockAvailable,
            discount,
            discountPrice,
            picture,
            description,
            category,
        } = req.body;

        if (!name || !brand || !stockAvailable || !discount || !discountPrice) {
            return handleBadRequest(res, DATA_REQUIRED);
        }

        const newProduct = new Product({
            name,
            brand,
            stockAvailable,
            discount,
            discountPrice,
            picture,
            description,
            category,
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        handleServerError(res, error, CREATE_ERROR);
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            return handleBadRequest(res, NOT_EXIST);
        }

        const {
            name,
            brand,
            stockAvailable,
            discount,
            discountPrice,
            picture,
            description,
            category,
        } = req.body;

        existingProduct.name = name || existingProduct.name;
        existingProduct.brand = brand || existingProduct.brand;
        existingProduct.stockAvailable = stockAvailable || existingProduct.stockAvailable;
        existingProduct.discount = discount || existingProduct.discount;
        existingProduct.discountPrice = discountPrice || existingProduct.discountPrice;
        existingProduct.picture = picture || existingProduct.picture;
        existingProduct.description = description || existingProduct.description;
        existingProduct.category = category || existingProduct.category;

        await existingProduct.save();
        res.json(existingProduct);
    } catch (error) {
        handleServerError(res, error, UPDATE_ERROR);
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            return handleBadRequest(res, NOT_EXIST);
        }

        await existingProduct.remove();

        res.json({ message: PRODUCT_DELETE});
    } catch (error) {
        handleServerError(res, error, DELETE_ERROR);
    }
};
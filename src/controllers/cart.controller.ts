import { Request, Response } from 'express';
import Cart, { ICart } from '../models/cart';
import Product from "../models/products";
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

export const createCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, selectedProducts } = req.body;

        if (!userId || !selectedProducts || selectedProducts.length === 0) {
            return handleBadRequest(res, DATA_REQUIRED);
        }

        const totalPrice = await calculateTotalPrice(selectedProducts);

        const newCart = new Cart({
            userId,
            products: selectedProducts,
            total: totalPrice,
        });
        await newCart.save();

        res.status(201).json(newCart);
    } catch (error) {
        handleServerError(res, error, CREATE_ERROR);
    }
};

async function calculateTotalPrice(selectedProducts: string[]): Promise<number> {
    const products = await Product.find({ _id: { $in: selectedProducts } });
    let totalPrice = 0;

    for (const product of products) {
        totalPrice += parseFloat(product.discountPrice);
    }

    return totalPrice;
}
import { Request, Response } from 'express';
import Cart, { ICart } from '../models/cart';
import Product from "../models/products";
import {
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
        const { selectedProducts } = req.body;

        if (!selectedProducts || selectedProducts.length === 0) {
            return handleBadRequest(res, DATA_REQUIRED);
        }

        const totalPrice = await calculateTotalPrice(selectedProducts);

        const newCart = new Cart({
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

export const getCartDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cartId } = req.body;

        const cart = await Cart.findById(cartId);

        if (!cart) {
            return handleBadRequest(res, NOT_EXIST);
        }
        res.json(cart);
    } catch (error) {
        handleServerError(res, error, 'Error al obtener los detalles del carrito');
    }
};

export const deleteProductFromCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cartId, productId } = req.body;
        const existingCart = await Cart.findById(cartId);

        if (!existingCart) {
            return handleBadRequest(res, NOT_EXIST);
        }

        const productIndex = existingCart.products.indexOf(productId);

        if (productIndex === -1) {
            return handleBadRequest(res, 'El producto no está en el carrito.');
        }

        const product = await Product.findById(productId);

        if (!product) {
            return handleBadRequest(res, NOT_EXIST);
        }

        const discountPrice = parseFloat(product.discountPrice);

        existingCart.products.splice(productIndex, 1);
        existingCart.total = (parseFloat(existingCart.total) - discountPrice).toString();
        await existingCart.save();
        res.json(existingCart);
    } catch (error) {
        handleServerError(res, error, DELETE_ERROR);
    }
};
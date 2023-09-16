import { Request, Response } from 'express';
import Cart, { ICart } from '../models/cart';
import User from '../models/user';
import Product, { IProducts } from '../models/products';
import PurchaseLog from '../models/purchaseLog';
import {
    CREATE_ERROR,
    NOT_EXIST,
    DATA_REQUIRED
} from '../utils/commons';

export const handleServerError = (res: Response, error: any, errorMessage: string) => {
    res.status(500).json({ error: errorMessage });
};

export const handleBadRequest = (res: Response, message: string) => {
    res.status(400).json({ msg: message });
}

export const makePurchase = async (req: Request, res: Response): Promise<void> => {
    const userId = '';

    try {
        const { selectedProducts } = req.body;

        if (!selectedProducts || selectedProducts.length === 0) {
            return handleBadRequest(res, DATA_REQUIRED);
        }

        const products = await Product.find({ _id: { $in: selectedProducts } });

        for (const product of products) {
            if (product.stockAvailable == '1') {
                return handleBadRequest(res, 'Uno o más productos no están disponibles en el inventario.');
            }
        }

        for (const product of products) {
            product.stockAvailable = (parseFloat(product.stockAvailable)- 1).toString();
            await product.save();
        }

        const purchaseLog = new PurchaseLog({
            userId,
            products: selectedProducts,
        });
        await purchaseLog.save();

        res.json({ message: 'Compra realizada con éxito', purchaseLog });
    } catch (error) {
        handleServerError(res, error, CREATE_ERROR);
    }
};

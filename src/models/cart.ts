import { Schema, Document, model, Types } from 'mongoose';
import { IProducts } from './products';

export interface ICart extends Document {
    products: Types.Array<IProducts>;
    total: string;
}

const cartSchema = new Schema<ICart>({
    products: [{ type: Types.ObjectId, ref: 'Product' }],
    total: String,
});

export const CartModel = model<ICart>('Cart', cartSchema);

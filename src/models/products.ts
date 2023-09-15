import { Schema, Document, model } from 'mongoose';

export interface IProducts extends Document {
    _id: string;
    name: string;
    brand: string;
    stockAvailable: string;
    discount: string;
    discountPrice: string;
    picture: string;
    description: string;
    category: string[];
}

const productsSchema = new Schema<IProducts>({
    name: String,
    brand: String,
    stockAvailable: String,
    discount: String,
    discountPrice: String,
    picture: String,
    description: String,
    category: [String],
});

export default model<IProducts>('Product', productsSchema);

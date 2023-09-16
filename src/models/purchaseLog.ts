import { Schema, Document, model } from 'mongoose';

export interface IPurchaseLog extends Document {
    userId: string;
    products: string[];
    purchaseDate: Date;
}

const purchaseLogSchema = new Schema<IPurchaseLog>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    purchaseDate: { type: Date, default: Date.now },
});

export default model<IPurchaseLog>('PurchaseLog', purchaseLogSchema);

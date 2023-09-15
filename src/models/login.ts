import { Schema, Document, model } from 'mongoose';

export interface ILogin extends Document {
    email: string;
    password: string;
}

const loginSchema = new Schema<ILogin>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: Boolean,
        default: false,
    },
});

export default model<ILogin>('Login', loginSchema);

import {Document, model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _id: string;
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>('User', userSchema);
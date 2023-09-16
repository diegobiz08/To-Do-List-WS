import {Document, model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import {
    PASSWORD_NOT_MATCH,
    PASSWORD_NOT_VALIDE
} from '../utils/commons';

export interface IUser extends Document {
    email: string;
    password: string;
    passwordConfirmation: string;
    DPI: string;
    NIT: string;
    name: string,
    lastName: string,
    bornDate: string,
    deliveryAddress: string,
    phoneNumber: string,
    purchaseHistory: string,
    comparePassword: (password: string) => Promise<boolean>
}

const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
        required: true,
        validate: {
            validator: validatePassword,
            message: PASSWORD_NOT_VALIDE,
        },
    },
    passwordConfirmation: {
        type: String,
        required: true,
        validate: {
            validator: confirmedPasswordMatch,
            message: PASSWORD_NOT_MATCH,
        },
    },
    DPI: { 
        type: String, 
        unique: true, 
        required: true 
    },
    NIT: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    lastName: {
        type: String,
        unique: true,
        required: true
    },
    bornDate: {
        type: String,
        unique: true,
        required: true
    },
    deliveryAddress: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
});

function confirmedPasswordMatch(this: IUser, value: string): boolean {
    return this.password === value;
}

function validatePassword(value: string): boolean {
    return passwordValidator.test(value);
}

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
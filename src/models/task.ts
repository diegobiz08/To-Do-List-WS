import { Schema, Document, model } from 'mongoose';

export interface ITask extends Document {
    description: string;
    completed: boolean;
    createdBy: string;
}

const taskSchema = new Schema<ITask>({
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: String,
        required: true,
    },
});

export default model<ITask>('Task', taskSchema);

import { Schema, Document, model } from 'mongoose';

export interface ITask extends Document {
    description: string;
    completed: boolean;
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
});

export default model<ITask>('Task', taskSchema);

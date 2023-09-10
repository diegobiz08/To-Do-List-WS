import mongoose from 'mongoose';
import { ConnectionOptions } from 'mongoose';
import dbConfig from '../config/dbConfig';

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

describe('Database Connection correct', () => {
    beforeAll(async () => {
        await mongoose.connect(dbConfig.DB.URI, dbOptions);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Should validate connection is ready to use', () => {
        expect(mongoose.connection.readyState).toBe(1);
    });
});

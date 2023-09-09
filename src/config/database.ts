import mongoose, {ConnectionOptions} from 'mongoose'
import dbConfig from './dbConfig';

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(dbConfig.DB.URI, dbOptions).then(r => {});

const connection = mongoose.connection;

connection.once('open', () =>{
    console.log('Connection established');
});

connection.on('error', err =>{
    console.log(err);
    process.exit(0);
})

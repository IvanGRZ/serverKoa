import mongoose from 'mongoose';
import logger4 from '../../loggers/index.js';
import { getMongoConfig } from '../session/config.js'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/store-db';

const mongooseConnect = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_URI, getMongoConfig()).then(() => {
        logger4.info('MONGOOSE CONNECTION OK');
    }).catch(err => {
        logger4.error(err);
        process.exit();
    })    
}

export default mongooseConnect;
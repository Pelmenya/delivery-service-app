import { app } from './src/app';
import mongoose from 'mongoose';

const {
    PORT = 3000,
    MONGODB_BOOKS_URL = 'mongodb://mongo:27017',
    MONGODB_ADMINUSERNAME = 'root',
    MONGODB_ADMINPASSWORD = 'example',
    DB_NAME = 'delivery',
} = process.env;

const start = async () => {
    try {
        await mongoose.connect(MONGODB_BOOKS_URL, {
            user: MONGODB_ADMINUSERNAME,
            pass: MONGODB_ADMINPASSWORD,
            dbName: DB_NAME,
        });
        console.log(`Connection: ${MONGODB_BOOKS_URL}`);
        console.log(`DB name: ${DB_NAME}`);
        app.listen(Number(PORT), () => {
            console.log(`listening on port ${PORT}! (in folder ${__dirname})`);
        });
    } catch (e) {
        console.log(String(e));
    }
};

start().catch(e => console.log(e));

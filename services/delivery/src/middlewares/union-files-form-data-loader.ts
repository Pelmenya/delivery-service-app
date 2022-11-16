import { publicBooksFilesDir } from '../utils/constants/constants';
import multer, { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, publicBooksFilesDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid()}---${file.originalname}`);
    },
});

const fields = [{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }];

export const unionFilesFormDataLoader = multer({ storage }).fields(fields);


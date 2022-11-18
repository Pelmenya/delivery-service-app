import path from 'path';
import fs from 'fs';
import { publicFilesDir } from '../utils/constants/constants';
import multer, { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { IUser } from '../types/i-user';
import { UnauthorizedError } from '../utils/errors-classes/unathorized-error';
import { ERRORS } from '../utils/constants/errors';

const storage = diskStorage({
    destination: (req, file, cb) => {
        const user = req.user as IUser;
        if (user) {
            const filesDir = path.join(__dirname, '../..', publicFilesDir, `/${String(user._id)}`);
            fs.access(filesDir, (errDir) => {
                if (errDir && errDir.code === 'ENOENT') {
                    fs.mkdir(filesDir, () => cb(null, `${publicFilesDir}/${String(user._id)}`));
                } else {
                    cb(null, `${publicFilesDir}/${String(user._id)}`);
                }
            });
        } else {
            cb(new UnauthorizedError(ERRORS.NEED_TO_AUTH), '');
        }
    },
    filename: (req, file, cb) => {
        const user = req.user as IUser;
        if (user) {
            cb(null, `${uuid()}---${file.originalname}`);
        } else cb(new UnauthorizedError(ERRORS.NEED_TO_AUTH), '');
    },
});

const fields = [{ name: 'images' }];

export const unionFilesFormDataLoader = multer({ storage }).fields(fields);


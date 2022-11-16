import { notDeleteFiles, publicBooksFilesDir } from '../constants/constants';
import fs from 'fs';

export const deleteBookFile = (file: string) => {
    if (!notDeleteFiles.includes(file)) {
        fs.unlink(`${publicBooksFilesDir}/${file}`, (err) => {
            if (err && err.code == 'ENOENT') {
                console.info('File doesn`t exist, won`t remove it.');
            } else if (err) {
                console.error('Error occurred while trying to remove file');
            }
        });
    }
};
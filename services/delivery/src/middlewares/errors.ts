import { NextFunction, Request, Response } from 'express';
import { ERRORS } from '../utils/constants/errors';

type TError = {
    statusCode?: number;
    message: string;
};

// нужна next функция, иначе генерит ошибку сервера по отправке заголовков
export const errors = (err: TError, req: Request, res: Response, next: NextFunction) => { 
    const { statusCode, message } = err;
    const ERROR = 'error';
    if (!statusCode) {
        if (message.indexOf('E11000 duplicate key error collection') === 0) {
            res.status(409);
            res.json({ erorr: ERRORS.DUPLICATE_KEY, status: ERROR });
        } else {
            res.status(500);
            res.json({ error: message, status: ERROR }); // лучше оставить message, т.к. видно, что не так
        }
    } else if (message.indexOf('Cast to ObjectId failed') === 0) {
        res.status(404);
        res.json({ error: ERRORS.INVALID_ID, status: ERROR  });
    } else {
        res.status(statusCode);
        res.json({ error: message, status: ERROR });
    } 
};


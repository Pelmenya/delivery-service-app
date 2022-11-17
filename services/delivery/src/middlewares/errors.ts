import { NextFunction, Request, Response } from 'express';
import { ERRORS } from '../utils/constants/errors';

type TError = {
    statusCode?: number;
    message: string;
};

export const errors = (err: TError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode, message } = err;
    const ERROR = 'error';
    if (!statusCode) {
        if (message.indexOf('E11000 duplicate key error collection') === 0) {
            res.status(409).json({ erorr: ERRORS.DUPLICATE_KEY, status: ERROR });
            next();
        } else {
            res.status(500).json({ error: message, status: 'error' }); // лучше оставить message, т.к. видно, что не так
            next();
        }
    } else if (message.indexOf('Cast to ObjectId failed') === 0) {
        res.status(404).json({ error: ERRORS.INVALID_ID, status: ERROR  });
        next();
    } else {
        res.status(statusCode).send({ error: message, status: ERROR });
        next();
    }
};


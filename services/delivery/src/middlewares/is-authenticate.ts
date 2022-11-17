import { NextFunction, Request, Response } from 'express';
import { ERRORS } from '../utils/constants/errors';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        throw new Error(ERRORS.NEED_TO_AUTH);
    }
    next();
};
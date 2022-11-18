import { NextFunction, Request, Response } from 'express';
import { ERRORS } from '../utils/constants/errors';
import { UnauthorizedError } from '../utils/errors-classes/unathorized-error';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        throw new UnauthorizedError(ERRORS.NEED_TO_AUTH);
    }
    next();
};
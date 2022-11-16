import { NextFunction, Request, Response } from 'express';
import { ROUTES } from '../utils/constants/routes';

const { API, USER, LOGIN } = ROUTES;

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        res.redirect(`${API}${USER}${LOGIN}`);
    }
    next();
};
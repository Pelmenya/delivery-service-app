import { NextFunction, Request, Response } from 'express';
import { Users } from '../models/users';
import { ROUTES } from '../utils/constants/routes';

const { NOT_FOUND_404 } = ROUTES;

export const signUpUser = (req: Request, res: Response, next: NextFunction) => {
    const handler = async () => {
        const { username, email, password } = req.body;

        const newUser = new Users({ username, email, password });
        try {
            if (newUser) {
                await newUser.save();
                next();
            } else {
                res.status(404);
                res.redirect(NOT_FOUND_404);
            }
        } catch (e) {
            res.status(500).json(e);
        }

    };

    handler().catch(err => console.log(err));
};

export const logoutUser = (req: Request, res: Response) => {
    req.logout((err) => console.log(err));
    res.redirect('/');
};
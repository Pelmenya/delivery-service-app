import { NextFunction, Request, Response } from 'express';
import { UserModule } from '../models/users';
import { IUser } from '../types/i-user';
import { TSignUpUser } from '../types/t-sign-up-user';
import { ERRORS } from '../utils/constants/errors';
import { NotFoundError } from '../utils/errors-classes/not-found-error';

export const signUpUser = (req: Request, res: Response, next: NextFunction) => {
    const handler = async () => {
        const { name, email, password, contactPhone } = req.body;
        const signUpData: TSignUpUser = { name, email, password, contactPhone };
        const newUser = await UserModule.create(signUpData);
        res.status(201);
        res.json({
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                contactPhone: newUser.contactPhone,
            },
            status: 'ok',
        });
    };

    handler().catch(next);
};

export const signInUser = (req: Request, res: Response) => {
    const user = req.user as IUser;
    if (user) {
        res.status(200);
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'dev') {
            res.redirect('/');
        } else {
            res.json({
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    contactPhone: user.contactPhone,
                },
                status: 'ok',
            });
        }
    } else {
        throw new NotFoundError(ERRORS.NOT_EXIST_USER);
    }
};

export const logoutUser = (req: Request, res: Response) => {
    req.logout((err) => console.log(err));
    res.status(200);
    res.json({ status: 'ok', data: null });
};
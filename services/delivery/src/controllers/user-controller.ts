import { NextFunction, Request, Response } from 'express';
import { UserModule } from '../models/users';
import { TSignUpUser } from '../types/t-sign-up-user';

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

/* export const signInUser = (req: Request, res: Response, next: NextFunction) => {
    const handler = async () => {
        const { user } = req;
        const user: TSignInUser = { email, password };
        const newUser = await UserModule.findByEmail(user);
        res.status(200);
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
}; */

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
    req.logout(next);
    res.status(200);
    res.json({ status: 'ok', data: null });
};
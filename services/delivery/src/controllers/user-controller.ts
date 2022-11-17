import { NextFunction, Request, Response } from 'express';
import { UserModule } from '../models/users';
import { IUser } from '../types/i-user';


export const signUpUser = (req: Request, res: Response, next: NextFunction) => {
    const handler = async () => {
        const { name, email, password, contactPhone } = req.body;
        const user = { name, email, password, contactPhone } as IUser;
        const newUser = await UserModule.create(user);
      
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

export const logoutUser = (req: Request, res: Response) => {
    req.logout((err) => console.log(err));
    res.redirect('/');
};
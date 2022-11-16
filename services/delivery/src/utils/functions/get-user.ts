import { Request } from 'express';

export const getUser = (req: Request) => {
    if (req.user) {
        return req.user;
    }
    return null;
};
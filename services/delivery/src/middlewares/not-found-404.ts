import { notFound404Text } from '../utils/constants/constants';
import { Request, Response } from 'express';

const notFound404 =  (req: Request, res: Response) => {
    res.status(404);
    res.json(notFound404Text);
};

export { notFound404 };
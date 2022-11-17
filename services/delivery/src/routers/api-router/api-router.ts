import { Router } from 'express';
import { ROUTES } from './routes';
import { authRouter } from './auth-router';

const { API } = ROUTES;


const apiRouter = Router();

apiRouter.use(API, authRouter);

export { apiRouter };
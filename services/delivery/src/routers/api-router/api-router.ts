import { Router } from 'express';
import { ROUTES } from './routes';
import { authRouter } from './auth-router/auth-router';
import { advertisementRouter } from './advertesement-router/advertisement-router';

const { API } = ROUTES;


const apiRouter = Router();

apiRouter.use(API, authRouter, advertisementRouter);

export { apiRouter };
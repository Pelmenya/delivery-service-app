import { Router } from 'express';
import { ROUTES } from '../../utils/constants/routes';

const { API } = ROUTES;


const apiRouter = Router();

apiRouter.use(API, (req, res) => res.json('ddd') );

export { apiRouter };
import { Router } from 'express';
import { ROUTES } from '../routes';
import { isAuthenticated } from '../../../middlewares/is-authenticate';
import { createAdvertisement } from '../../../controllers/advertisement-controller';

const { ADVERTISEMENTS } = ROUTES;

const advertisementRouter = Router();

advertisementRouter.post(`${ADVERTISEMENTS}`, isAuthenticated, createAdvertisement );

export { advertisementRouter };

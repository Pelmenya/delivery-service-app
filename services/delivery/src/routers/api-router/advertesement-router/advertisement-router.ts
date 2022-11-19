import { Router } from 'express';
import { ROUTES } from '../routes';
import { isAuthenticated } from '../../../middlewares/is-authenticate';
import { createAdvertisement, getAdvertisements } from '../../../controllers/advertisement-controller';

const { ADVERTISEMENTS } = ROUTES;

const advertisementRouter = Router();

advertisementRouter.post(`${ADVERTISEMENTS}`, isAuthenticated, createAdvertisement );
advertisementRouter.get(`${ADVERTISEMENTS}`, getAdvertisements);


export { advertisementRouter };

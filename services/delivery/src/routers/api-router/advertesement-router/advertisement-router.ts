import { Router } from 'express';
import { ROUTES } from '../routes';
import { isAuthenticated } from '../../../middlewares/is-authenticate';
import { 
    createAdvertisement, 
    getAdvertisements, 
    deleteAdvertisement,
    getAdvertisement,
} from '../../../controllers/advertisement-controller';

const { ADVERTISEMENTS, ID } = ROUTES;

const advertisementRouter = Router();

advertisementRouter.get(`${ADVERTISEMENTS}`, getAdvertisements);

advertisementRouter.get(`${ADVERTISEMENTS}${ID}`,  getAdvertisement);

advertisementRouter.post(`${ADVERTISEMENTS}`, isAuthenticated, createAdvertisement);

advertisementRouter.delete(`${ADVERTISEMENTS}${ID}`, isAuthenticated, deleteAdvertisement);


export { advertisementRouter };

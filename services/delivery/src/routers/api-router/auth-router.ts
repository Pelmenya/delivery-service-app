import { logoutUser, signInUser, signUpUser } from '../../controllers/user-controller';
import { passportAuthenticate } from '../../middlewares/passport-authenticate';
import { Router } from 'express';
import { ROUTES } from './routes';
import { isAuthenticated } from '../../middlewares/is-authenticate';

const { SIGNIN, SIGNUP, LOGOUT } = ROUTES;

const authRouter = Router();

authRouter.post(`${SIGNUP}`, signUpUser);

authRouter.post(`${SIGNIN}`, passportAuthenticate, signInUser);

authRouter.post(`${LOGOUT}`, isAuthenticated, logoutUser);


export { authRouter };

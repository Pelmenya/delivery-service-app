import { signUpUser } from '../../controllers/user-controller';
import { passportAuthenticate } from '../../middlewares/passport-authenticate';
import { Router } from 'express';
import { ROUTES } from './routes';

const { SIGNIN, SIGNUP, LOGOUT } = ROUTES;

const authRouter = Router();

authRouter.post(`${SIGNUP}`, signUpUser);



export { authRouter };

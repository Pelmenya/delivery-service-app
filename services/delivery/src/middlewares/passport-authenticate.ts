import { RequestHandler } from 'express';
import { passport } from './passport';
import { ROUTES } from '../utils/constants/routes';

const { API, USER, LOGIN } = ROUTES;

export const passportAuthenticate: RequestHandler = passport.authenticate(
    'local', { failureRedirect: `${API}${USER}${LOGIN}?signup` });
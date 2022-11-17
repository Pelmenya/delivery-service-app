import { RequestHandler } from 'express';
import { passport } from './passport';

export const passportAuthenticate: RequestHandler = passport.authenticate('local');
import express from 'express-session';

const { SECRET =  'SECRET' } = process.env;

export const expressSession = express({ secret: SECRET,  resave: true, saveUninitialized: true });
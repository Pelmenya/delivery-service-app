import http from 'http';
import { Server } from 'socket.io';
import { expressSession } from '../middlewares/express-session';

import { app } from '../app';
import { Request, Response, NextFunction } from 'express';
import { passportInitialize, passportSession } from '../middlewares/passport';
import { UnauthorizedError } from '../utils/errors-classes/unathorized-error';
import { ERRORS } from '../utils/constants/errors';
import { IUser } from '../types/i-user';

const httpServer = http.createServer(app);

const io = new Server(httpServer);


io.use((socket, next) => {
    const req = socket.request as Request;
    expressSession(req, {} as Response, next as NextFunction);
});

io.use((socket, next) => {
    const req = socket.request as Request;
    passportInitialize(req, {} as Response, next as NextFunction);
});

io.use((socket, next) => {
    const req = socket.request as Request;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    passportSession(req, {} as Response, next as NextFunction);
});

io.use((socket, next) => {
    const { user } = socket.request as Request & { user: IUser };
    console.log(user);
    if (user) {
        next();
    } else {
        next(new UnauthorizedError(ERRORS.NEED_TO_AUTH));
    }
});


io.on('connection', (socket) => {
    const { id } = socket;
    const { session } = socket.request as Request;

    console.log(session);
    console.log(`Socket connected: ${id}`);

    // сообщение себе
    socket.on('message-to-me', (msg) => {
        console.log(msg);
        socket.emit('message-to-me', msg);
    });

    // сообщение для всех
    socket.on('message-to-all', (msg) => {
        socket.broadcast.emit('message-to-all', msg);
        socket.emit('message-to-all', msg);
        console.log(msg);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
});

export { httpServer };
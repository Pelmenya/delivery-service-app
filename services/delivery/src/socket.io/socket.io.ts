import http from 'http';
import { Server } from 'socket.io';
import { expressSession } from '../middlewares/express-session';

import { app } from '../app';
import { Request, Response, NextFunction } from 'express';
import { passportInitialize, passportSession } from '../middlewares/passport';
import { UnauthorizedError } from '../utils/errors-classes/unathorized-error';
import { ERRORS } from '../utils/constants/errors';
import { IUser } from '../types/i-user';
import { Chat, chatEmiter } from '../models/chat';
import { TSendMessageData } from '../types/t-send-message-data';

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

    if (user) {
        next();
    } else {
        next(new UnauthorizedError(ERRORS.NEED_TO_AUTH));
    }
});


io.on('connection', (socket) => {
    const { id } = socket;
    const { user } = socket.request as Request & { user: IUser };

    console.log(`Socket connected: ${id}`);

    socket.on('sendMessage', (msg: TSendMessageData) => {
        chatEmiter.emit('sendMessage', { ...msg, author: String(user._id) });
    });

    Chat.subscribe((data) => {
        socket.emit('newMessage', data);
    });

    socket.on('getHistory', (recieverId : string) => {
        const handler = async () => {
            const chat = await Chat.find([recieverId, user._id ]);
            console.log(chat);
            if (chat) {
                const messages = await Chat.getHistory(String(chat._id));
                socket.emit('chatHistory', messages);
            } else socket.emit('chatHistory', chat);
        };

        handler().catch(err =>  socket.emit('chatHistory', err));
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
});

export { httpServer };
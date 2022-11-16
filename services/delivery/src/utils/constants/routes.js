"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTES = void 0;
const USER_ROUTES = {
    USER: '/user',
    LOGIN: '/login',
    SIGNUP: '/signup',
    ME: '/me',
    LOGOUT: '/logout',
};
const BOOKS_ROUTES = {
    BOOKS: '/books',
    DOWNLOAD: '/download',
};
const VIEW_ROUTES = {
    INDEX: '/index',
    VIEW: '/view',
    CREATE: '/create',
    UPDATE: '/update',
    NOT_FOUND_404: '/not-found-404',
};
exports.ROUTES = Object.assign(Object.assign(Object.assign({ API: '/api', ID: '/:id' }, USER_ROUTES), BOOKS_ROUTES), VIEW_ROUTES);

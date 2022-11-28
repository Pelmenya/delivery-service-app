import corsMiddleware from 'cors';

// настроить для продакшн
export const cors = corsMiddleware({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
});

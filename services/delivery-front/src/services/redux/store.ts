import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const isDev = process.env.NODE_ENV !== 'production';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(isDev ? [logger] : []),
    devTools: isDev,
});

export type StoreType = typeof store;

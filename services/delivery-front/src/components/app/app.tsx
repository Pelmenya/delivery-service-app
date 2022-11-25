import React from 'react';

import { RoutesProvider } from '../routes-provider/routes-provider';

import './app.css';

export const App = () => (
    <div className="app">
        <RoutesProvider />
    </div>
);

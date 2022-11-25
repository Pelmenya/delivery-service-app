import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { NotFoundPage } from 'pages/not-found-page/not-found';
import { MainPage } from '../../pages/main-page/main-page';

export const RoutesProvider = () => (
    <Routes>
        <Route path="/" index element={<MainPage/>} />
        <Route path="*" element={<NotFoundPage/>} />
    </Routes>
);

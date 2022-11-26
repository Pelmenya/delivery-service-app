import React, { useEffect } from 'react';

import { Title } from '../../components/title/title';
import { useAppSelector } from '../../hooks/use-app-selector';
import { Loader } from '../../components/loader/loader';
import { Header } from '../../components/header/header';
import { Container } from '@mui/material';

import './main-page.css';
import { getRandomRating } from '../../utils/functions/get-random-rating';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

export const MainPage = () => {
    const dispatch = useAppDispatch();

    return (
        <Container sx={{
            width: '100%',
            height: '100%',
            minHeight: '100vh',
            backgroundColor: 'var(--body-color)',
        }}
        >
            <Header />
            <main>
                <Title className="h1" type="h1">Страница </Title>
                {false ? (
                    <div />
                ) : <Loader />}
            </main>
        </Container>
    );
};

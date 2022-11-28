import React, { useEffect } from 'react';

import { Title } from '../../components/title/title';
import { useAppSelector } from '../../hooks/use-app-selector';
import { Loader } from '../../components/loader/loader';
import { Header } from '../../components/header/header';
import { Container } from '@mui/material';

import './main-page.css';
import { getRandomRating } from '../../utils/functions/get-random-rating';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchAdvertisementsData } from '../../services/redux/slices/advertisements/advertisements';
import { getAdvertisement } from '../../../../delivery/src/controllers/advertisement-controller';
import { getAdvertisementsState } from '../../services/redux/selectors/advertisements/advertisements';

export const MainPage = () => {
    const dispatch = useAppDispatch();
    const { advertisements } = useAppSelector(getAdvertisementsState);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        dispatch(fetchAdvertisementsData());
    }, []);

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
                <h1 className="h1">Объявления</h1>
                <h1 className="h2">Объявления</h1>
                {advertisements ? (
                    <div />
                ) : <Loader />}
            </main>
        </Container>
    );
};

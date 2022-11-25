import React, { useEffect } from 'react';

import shortId from 'shortid';

import { Title } from '../../components/title/title';
import { fetchNewsData, setInnerId } from '../../services/redux/slices/news/news';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getNewsState } from '../../services/redux/selectors/news/news';
import { Loader } from '../../components/loader/loader';
import { Header } from '../../components/header/header';
import { Container } from '@mui/material';

import './main-page.css';
import { NewsList } from '../../components/news-list/news-list';
import { getRandomRating } from '../../utils/functions/get-random-rating';

export const MainPage = () => {
    const { news, newsLazy, loading } = useAppSelector(getNewsState);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!news) {
            dispatch(fetchNewsData());
        }
    }, [news]);

    useEffect(() => {
        if (loading === 'succeeded') {
            if (news && !newsLazy) {
                dispatch(setInnerId(
                    news.map((item) => ({ ...item, innerId: shortId.generate(), rating: getRandomRating() })),
                ));
            }
        }
    }, [loading, newsLazy]);

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
                <Title className="h1" type="h1">Страница новостей</Title>
                {news ? (
                    <NewsList />
                ) : <Loader />}
            </main>
        </Container>
    );
};

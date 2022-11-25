import React, { useEffect, useRef } from 'react';
import { styled, css } from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
import { useAppSelector } from 'hooks/use-app-selector';
import { getNewsState } from 'services/redux/selectors/news/news';
import { useDispatch } from 'react-redux';
import { addBatchNews, incrementStep } from 'services/redux/slices/news/news';
import { countOfBatch } from 'utils/constants/constants';
import { NewsItem } from './components/news-item';

const LazyPlaceholder = styled('div')(
    () => css`
    height: 10px;
  `,
);

const LoadingContainer = styled('div')(
    () => css`;
  `,
);

export const NewsList = () => {
    const dispatch = useDispatch();

    const {
        newsLazy, news, step, maxSteps,
    } = useAppSelector(getNewsState);

    const placeholder = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const callback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                const { isIntersecting } = entry;
                if (isIntersecting) {
                    if (news && newsLazy && step < maxSteps) {
                        const batch = [...news];
                        dispatch(addBatchNews([
                            ...batch?.slice(0, (step + 1) * countOfBatch),
                        ]));
                        dispatch(incrementStep());
                    }
                }
            });
        };

        const options = {
            root: null,
            threshold: 0.25,
            rootMargin: '0px',
        };

        const observer = new IntersectionObserver(callback, options);

        if (placeholder && placeholder.current) {
            observer.observe(placeholder.current);
        }
        return () => observer.disconnect();
    }, [placeholder, dispatch, newsLazy, step, news]);

    if (!newsLazy) return null;

    return (
        <>
            <Grid container spacing={2} mt={2} padding={0}>
                {newsLazy.map((item) => (
                    <NewsItem
                        key={item.innerId}
                        author={item.author}
                        title={item.title}
                        url={item.url}
                        urlToImage={item.urlToImage}
                        innerId={item.innerId}
                        publishedAt={item.publishedAt}
                        description={item.description}
                        content={item.content}
                        source={item.source}
                        isFavorite={item.isFavorite}
                        rating={item.rating}
                    />
                ))}
            </Grid>
            <LoadingContainer>
                <LazyPlaceholder ref={placeholder} />
            </LoadingContainer>
        </>
    );
};

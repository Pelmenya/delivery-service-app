import React, { useCallback, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { INewsItem } from 'utils/types/news-item';
import Grid from '@mui/material/Unstable_Grid2';

import './news-item.css';
import { formatTime } from 'utils/functions/format-time';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { useNavigate } from 'react-router-dom';
import { Flex } from 'components/flex/flex';
import { useFavoritesNews } from 'hooks/use-favorite-news';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    display: 'flex',
    height: '155px',
    maxHeight: '155px',
    minHeight: '155px',
    cursor: 'pointer',
}));

export const NewsItem = ({
    author,
    title,
    urlToImage,
    innerId,
    publishedAt,
    description,
    isFavorite,
    rating,
}: INewsItem) => {
    const { handlerOnCLickFavoriteIcon } = useFavoritesNews(isFavorite, innerId);
    const navigate = useNavigate();

    const date = useMemo(() => formatTime(publishedAt), [publishedAt]);

    const handlerOnCLickNewItem = useCallback(() => navigate(`/news/${innerId}`), []);

    return (
        <Grid xs={3} className="news-grid">
            <Item className="news-item" onClick={handlerOnCLickNewItem}>
                <div className="news-item__author">
                    <img className="news-item__image" src={urlToImage} alt={description} />
                    <p className="item__p">{author}</p>
                    <p className="item__p">{date}</p>
                </div>
                <div className="news-item__description">
                    <h6 className="news-item__title">{title}</h6>
                    <Flex gap={8} className="news-item__rating">
                        <StarBorderIcon color="warning" />
                        <span>{rating}</span>
                    </Flex>
                </div>
            </Item>
            {isFavorite
                ? <Favorite color="info" className="news-item__heart" onClick={handlerOnCLickFavoriteIcon} />
                : <FavoriteBorder color="disabled" className="news-item__heart" onClick={handlerOnCLickFavoriteIcon} />}
        </Grid>
    );
};

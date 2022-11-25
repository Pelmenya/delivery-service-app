// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-props-no-spreading */
// отключил, т.к. по default spread в mui
import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Button from '@mui/material/Button';

import { useAppSelector } from 'hooks/use-app-selector';
import { getNewsState } from 'services/redux/selectors/news/news';

import './menu-favorites-news.css';
import { useNavigate } from 'react-router-dom';

export const MenuFavoritesNews = () => {
    const navigate = useNavigate();
    const { newsFavorites } = useAppSelector(getNewsState);

    return (
        <PopupState variant="popover" popupId="favorite-popup-menu">
            {(popupState) => (
                <>
                    <Button variant="contained" color="info" {...bindTrigger(popupState)}>
                        Избранное
                    </Button>
                    <Menu {...bindMenu(popupState)} className="menu-favorites-news">
                        {newsFavorites
                            .map((item) => (
                                <MenuItem
                                    key={item.innerId}
                                    onClick={() => {
                                        navigate(`/news/${item.innerId}`);
                                        popupState.close();
                                    }}
                                >
                                    <img src={item.urlToImage} alt={item.title} className="menu-favorites-news__img" />
                                    <p className="menu-favorites-news__item">{item.title}</p>
                                </MenuItem>
                            ))}
                    </Menu>
                </>
            )}
        </PopupState>
    );
};

import React, { useCallback } from 'react';
import {
    AppBar, Box, Toolbar,
} from '@mui/material';


import { styled, css } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

import './header.css';
import { useDispatch } from 'react-redux';

const ButtonsContainer = styled('div')(
    () => css`
    display: flex;
    gap: 24px;
    `,
);

export const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const navigate = useNavigate();


    return (
        <header>
            <Box sx={{ flexGrow: 1, backgroundColor: '#fff' }}>
                <AppBar position="static">
                    <Toolbar>
                        <ButtonsContainer>
                        </ButtonsContainer>
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
};

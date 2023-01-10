import React from 'react';

import { styled } from '@mui/material/styles';

import { CircularProgress, Box } from '@mui/material';

export const Loader = () => (
    <CircularProgress
        size={70}
        sx={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            color: 'var(--light-blue)',
        }}
    />
);

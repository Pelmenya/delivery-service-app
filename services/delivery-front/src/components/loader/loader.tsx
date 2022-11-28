import React from 'react';

import { styled } from '@mui/material/styles';

import { CircularProgress, Box } from '@mui/material';

const DisabledBackground = styled(Box)({
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: '#ccc',
    opacity: 0.5,
    zIndex: 1,
});

export const Loader = () => (
    <>
        <CircularProgress
            size={70}
            sx={{
                position: 'fixed',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
            }}
        />
        <DisabledBackground />
    </>
);

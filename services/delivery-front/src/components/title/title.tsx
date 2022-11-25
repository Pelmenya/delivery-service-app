import React from 'react';
import { Typography } from '@mui/material';

export interface TitlePropsType {
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children?: JSX.Element | string;
    className?: string;
}

export const Title = ({ type, children, className = '' }: TitlePropsType) => {
    switch (type) {
        case 'h1':
            return <Typography className={className} variant="h1" component="h1">{children}</Typography>;
        case 'h2':
            return <Typography className={className} variant="h2" component="h2">{children}</Typography>;
        case 'h3':
            return <Typography className={className} variant="h3" component="h3">{children}</Typography>;
        case 'h4':
            return <Typography className={className} variant="h4" component="h4">{children}</Typography>;
        case 'h5':
            return <Typography className={className} variant="h5" component="h5">{children}</Typography>;
        case 'h6':
            return <Typography className={className} variant="h6" component="h6">{children}</Typography>;
        default:
            return <Typography className={className} variant="h6" component="h6">{children}</Typography>;
    }
};

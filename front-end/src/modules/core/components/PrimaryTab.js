import React, { useState } from 'react';

import { Typography } from '@mui/material';

export default function PrimaryTab({ children }) {
    const [onHover, setOnHover] = useState(false);

    const hoveredStyle = (theme) => ({
        borderBottom: `3px solid ${theme.palette.primary.main}`,
        fontSize: '18px',
        transition: 'transform .25s',
        transform: 'scale(1.2)'
    });

    return (
        <Typography
            p={1}
            m={2}
            sx={onHover && hoveredStyle}
            onMouseOver={() => setOnHover(true)}
            onMouseOut={() => setOnHover(false)}
        >
            {children}
        </Typography>
    );
}

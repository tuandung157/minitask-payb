import React, { useState } from 'react';

import { Box, Grid, Container, Button } from '@mui/material';
import { styled } from '@mui/system';
import WalletCard from './WalletCard';
import CalAvg from './CalAvg';
import PrimaryTab from '../modules/core/components/PrimaryTab';

const CustomTab = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});

export default function HomePage() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(event);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Container maxWidth="xl">
                <Grid container>
                    <CustomTab item xs={12} md={3}>
                        <img src="./logo-with-name.png" alt="MetaMask logo" height={150} />
                    </CustomTab>
                    <CustomTab item xs={12} md={6}>
                        <div onClick={() => setValue(0)}>
                            <PrimaryTab>Wallet</PrimaryTab>
                        </div>
                        <div onClick={() => setValue(1)}>
                            <PrimaryTab>Calculator</PrimaryTab>
                        </div>
                        <PrimaryTab>About</PrimaryTab>
                    </CustomTab>
                    <CustomTab item xs={12} md={3}>
                        <Button variant="contained">Get Started</Button>
                    </CustomTab>
                </Grid>
            </Container>
            {value === 0 && <WalletCard />}
            {value === 1 && <CalAvg />}
        </Box>
    );
}

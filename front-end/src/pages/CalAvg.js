import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { TextField, Box, Grid, Container, Button, Typography } from '@mui/material';
import BasicDateRangePicker from '../modules/core/components/BasicDateRangePicker';

export default function CalAvg() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [coinId, setCoinId] = useState('bitcoin');
    const [currency, setCurrency] = useState('usd');
    const [dateFrom, setDateFrom] = useState(moment().unix() - 86400);
    const [dateTo, setDateTo] = useState(moment().unix());
    const [data, setData] = useState('');
    const [avgPrice, setAvgPrice] = useState('');
    const [validate, setValidate] = useState('false');
    useEffect(() => {});

    const calculator = async () => {
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=${currency}&from=${dateFrom}&to=${dateTo}`;
        console.log(url);
        // validate
        setErrorMessage('');
        try {
            const response = await fetch(url, {
                method: 'GET'
            });
            if (response.ok) {
                const json = await response.json();
                setData(json);
                const { prices } = json;
                let sum = 0;
                const { length } = prices;
                prices.forEach((price) => {
                    sum += price[1];
                });
                if (Number.isNaN(sum / length)) {
                    setAvgPrice('cannot be calculated');
                } else {
                    setAvgPrice(Math.floor(sum / length));
                }
            } else {
                setAvgPrice(null);
                setErrorMessage('check your coinid');
            }
        } catch (error) {
            console.log('fetch error', error);
        }
    };
    const handleChangeCoinId = (e) => {
        setCoinId(e.target.value);
        console.log(e.target.value);
    };
    // get and fix type date
    const handleDateRange = (childdata) => {
        setDateFrom(moment(childdata[0]).format('X'));
        setDateTo(moment(childdata[1]).format('X'));
    };

    return (
        <>
            <Box>
                <Container maxWidth="xl">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={3} marginBottom>
                            <Typography variant="h3">MiniTask2</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center" marginBottom>
                        <Grid item xs={3}>
                            <TextField
                                defaultValue="bitcoin"
                                id="outlined-basic"
                                onChange={handleChangeCoinId}
                                label="Coinid"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center" marginBottom>
                        <Grid item xs={3}>
                            <BasicDateRangePicker childToParent={handleDateRange} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center" marginBottom>
                        <Grid item xs={2}>
                            <Button onClick={calculator} variant="contained">
                                Calculator
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center" marginBottom>
                        <Grid item xs={2} justifyContent="center" marginBottom>
                            <Typography variant="p">{errorMessage}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={3} marginBottom>
                            <Typography variant="h5">price: {avgPrice}</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

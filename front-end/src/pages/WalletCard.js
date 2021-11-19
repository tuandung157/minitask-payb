import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Box, Grid, Container, Button, Typography } from '@mui/material';
import listNetwork from '../network.json';

export default function WalletCard() {
    const [error, setError] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [defaultChainId, setDefaultChainId] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connectButton, setconnectButton] = useState('Connect Wallet');
    const [nameNetwork, setNameNetwork] = useState(null);

    const connectWalletHandler = () => {
        if (window?.ethereum && window.ethereum.isMetaMask) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((result) => {
                    accountChangedHandler(result[0]);
                    setconnectButton('Wallet Connected');
                    getAccountBalance(result[0]);
                })
                .catch((error) => {
                    setError(error.message);
                });
        } else {
            setError('Error: Need install MetaMask ');
        }
    };

    const getChainId = () => {
        window.ethereum
            .request({ method: 'eth_chainId' })
            .then((chainId) => {
                const chainIdInt = parseInt(chainId, 16);
                setDefaultChainId(chainIdInt);
                const json = JSON.parse(JSON.stringify(listNetwork));
                const jsonChoice = json.find((network) => network.chainId === chainIdInt);
                setNameNetwork(jsonChoice.name);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const getAccountBalance = (account) => {
        window.ethereum
            .request({ method: 'eth_getBalance', params: [account, 'latest'] })
            .then((balance) => {
                setUserBalance(ethers.utils.formatEther(balance));
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    // change account
    const accountChangedHandler = (accountChanged) => {
        setDefaultAccount(accountChanged);
        getChainId(accountChanged.toString());
        getAccountBalance(accountChanged.toString());
    };

    // reload when change network/ chanid
    const chainChangedHandler = () => {
        window.location.reload();
    };

    // listen for account changes
    window.ethereum?.on('accountsChanged', accountChangedHandler);
    window.ethereum?.on('chainChanged', chainChangedHandler);

    return (
        <Box>
            <Container maxWidth="xl">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={3}>
                        <Typography variant="h3">MiniTask1</Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={3} justifyContent="center" marginTop>
                    <Grid item xs={12}>
                        <Typography variant="h4">Address: {defaultAccount}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">Balance: {userBalance}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">ChainId: {defaultChainId}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">Network: {nameNetwork}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={3}>
                        <Button onClick={connectWalletHandler} variant="contained">
                            {connectButton}
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">{error}</Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

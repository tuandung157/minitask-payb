import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import moment from 'moment';

export default function BasicDateRangePicker({ childToParent }) {
    const [value, setValue] = useState([new Date() - 86400000, new Date()]);
    const [errorFrom, setErrorFrom] = useState('');
    const [errorTo, setErrorTo] = useState('');

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                    startText="From"
                    endText="To"
                    maxDate={new Date()}
                    value={value}
                    clearable
                    onChange={(newValue) => {
                        setErrorFrom('');
                        setErrorTo('');
                        console.log(moment(newValue[0]).format('X'));
                        // 1290020651 timestamp 10 years ago
                        if (moment(newValue[0]).format('X') <= 1290020651) {
                            setErrorFrom('error: earlier input date ');
                        }
                        if (moment(newValue[1]).format('X') >= moment().unix()) {
                            setErrorTo('error: before today ');
                        }
                        if (newValue[0] != null && moment(newValue[0]).format('X') >= moment(newValue[1]).format('X')) {
                            console.log('check');
                            setErrorFrom('error: same day or To < From ');
                        }
                        childToParent(newValue);
                        setValue(newValue);
                        console.log(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                        <>
                            <TextField {...startProps} helperText={errorFrom} required />
                            <Box sx={{ mx: 1 }}> </Box>
                            <TextField {...endProps} helperText={errorTo} required />
                        </>
                    )}
                />
            </LocalizationProvider>
        </>
    );
}

import * as React from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TextField, Card, Grid, Typography} from '@mui/material';
import {useState} from 'react';
import {motion} from 'framer-motion';
import DateTimeHelper from "../helpers/DateTimeHelper";

const DateRangeFilter = ({startDate, setStartDate, endDate, setEndDate}) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 40}}
            animate={{opacity: 1, y: 0, transition: {delay: 0.2}}}
        >
            <Card className='p-24'>
                <Typography className="text-3xl font-bold" variant="h1" sx={{mb: 2}}>
                    Choose a date range
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(value) => setStartDate(DateTimeHelper.convertToSearchDate(value))}
                                renderInput={(props) => <TextField {...props} fullWidth/>}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(value) => setEndDate(DateTimeHelper.convertToSearchDate(value))}
                                renderInput={(props) => <TextField {...props} fullWidth/>}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </Card>
        </motion.div>
    );
}

export default DateRangeFilter;
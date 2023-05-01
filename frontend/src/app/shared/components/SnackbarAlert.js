import * as React from 'react';
import { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackbarAlert = ({ open, setOpen, vertical, horizontal, type, message }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Snackbar
            anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
            open={open}
            key={vertical + horizontal}
            autoHideDuration={5000}
            onClose={() => setOpen(false)}
        >
            <Alert severity={type} sx={{ width: '100%' }} elevation={24} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
}

export default SnackbarAlert;

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

const MyProfileModal = ({ open, setOpen }) => {
    const CURRENT_USER = JSON.parse(localStorage.getItem("current_user"));

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-my-profile-title"
                aria-describedby="alert-my-profile-description"
                PaperProps={{
                    style: {
                        backgroundColor: '#200D1F',
                    },
                }}
                fullWidth={true}
                maxWidth="xs"
            >
                <DialogTitle id="alert-my-profile-title" className="text-center">
                    <img className="w-2/3 mx-auto my-20" src="assets/images/logo/eregulation-light.svg" alt="logo" />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-my-profile-description">
                        <Typography className="text-3xl text-white font-extrabold text-center mb-10">
                            {CURRENT_USER.first_name && CURRENT_USER.last_name}
                        </Typography>
                        <Typography className="text-xl text-white font-medium text-center">
                            {CURRENT_USER.username}
                        </Typography>
                        <Typography className="text-xl text-white font-medium text-center">
                            {CURRENT_USER.email}
                        </Typography>
                        <Typography className="text-xl text-white font-medium text-center mt-10">
                            <div className="inline font-semibold py-4 px-12 rounded-full truncate bg-pink-200 text-red-800">Admin</div>
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MyProfileModal;
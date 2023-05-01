import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const UsersDeleteModal = ({ open, setOpen, onConfirm }) => {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-users-delete-title"
                aria-describedby="alert-users-delete-description"
            >
                <DialogTitle id="alert-users-delete-title">
                    Delete confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-users-delete-description">
                        Are you sure you want to delete the User?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button color="error" onClick={onConfirm}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UsersDeleteModal;
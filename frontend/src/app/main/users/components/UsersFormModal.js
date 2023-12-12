import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const usersSchema = yup.object().shape({
    username: yup.string()
        .required('Required field'),
    email: yup.string()
        .required('Required field')
        .email('Wrong email format'),
    password: yup.string()
        .required('Required field')
        .min(8, 'Should be 8 chars minimum'),
    confirmPassword: yup.string()
        .required('Required field')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    firstName: yup.string()
        .required('Required field'),
    lastName: yup.string()
        .required('Required field'),
});

const UsersFormModal = ({ open, setOpen, onConfirm }) => {
    const { control, formState, handleSubmit } = useForm({
        mode: 'onChange',
        resolver: yupResolver(usersSchema),
    });

    const { errors } = formState;

    function onSubmit({
        username,
        email,
        password,
        firstName,
        lastName
    }) {
        const body = JSON.stringify({
            username: username,
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName
        })
        onConfirm();
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-users-form-title"
                aria-describedby="alert-users-form-description"
                fullWidth={true}
                maxWidth="md"
            >
                <DialogTitle id="alert-users-form-title">
                    Add/Edit User
                </DialogTitle>
                <form
                    name="usersForm"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <DialogContent>
                        <DialogContentText id="alert-users-form-description">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20">
                                <Controller
                                    name="firstName"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mb-24"
                                            label="First Name"
                                            type="text"
                                            variant="outlined"
                                            error={!!errors.firstName}
                                            helperText={errors?.firstName?.message}
                                            required
                                            fullWidth
                                        />
                                    )}
                                />

                                <Controller
                                    name="lastName"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mb-24"
                                            label="Last Name"
                                            type="text"
                                            variant="outlined"
                                            error={!!errors.lastName}
                                            helperText={errors?.lastName?.message}
                                            required
                                            fullWidth
                                        />
                                    )}
                                />

                                <Controller
                                    name="username"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mb-24"
                                            label="Username"
                                            type="text"
                                            variant="outlined"
                                            error={!!errors.username}
                                            helperText={errors?.username?.message}
                                            required
                                            fullWidth
                                        />
                                    )}
                                />

                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mb-24"
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            error={!!errors.email}
                                            helperText={errors?.email?.message}
                                            required
                                            fullWidth
                                        />
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20">
                                <div className="col-span-1 sm:col-span-2 mb-20">
                                    <hr />
                                </div>

                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mb-24"
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                            error={!!errors.password}
                                            helperText={errors?.password?.message}
                                            required
                                            fullWidth
                                        />
                                    )}
                                />

                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mb-24"
                                            label="Confirm Password"
                                            type="password"
                                            variant="outlined"
                                            error={!!errors.confirmPassword}
                                            helperText={errors?.confirmPassword?.message}
                                            required
                                            fullWidth
                                        />
                                    )}
                                />
                            </div>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" color="success">
                            Add/Edit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default UsersFormModal;
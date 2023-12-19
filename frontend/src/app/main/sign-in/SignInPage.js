import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import AuthService from 'src/app/shared/services/auth-service';
import {showMessage} from "app/store/fuse/messageSlice";

const schema = yup.object().shape({
    email: yup.string().email('You must enter a valid email').required('You must enter a email'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(4, 'Password is too short - must be at least 4 chars.'),
});

const defaultValues = {
    email: '',
    password: '',
};

function SignInPage() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const {control, formState, handleSubmit, setError, setValue} = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });

    const {isValid, dirtyFields, errors} = formState;

    useEffect(() => {
        setValue('email', 'admin@mail.com', {shouldDirty: true, shouldValidate: true});
        setValue('password', 'admin', {shouldDirty: true, shouldValidate: true});
    }, [setValue]);

    function onSubmit({email, password}) {
        setIsLoading(true);
        AuthService.login(email, password).then((response) => {
            if (response) {
                localStorage.setItem("access_token", response?.data?.accessToken);

                AuthService.currentUser().then((currentUser) => {
                    if (currentUser) {
                        localStorage.setItem("current_user", JSON.stringify(currentUser?.data));
                        window.location.href = "/dashboard";
                    }
                })
            }
        }, (err) => {
            if (err) {
                setIsLoading(false);
                setValue('password', '', {shouldDirty: true, shouldValidate: true});
                dispatch(showMessage({message: err?.response?.data?.message || "An error occurred! Try again."}));
            }
        })
    }

    return (
        <div className="flex flex-col flex-auto items-center justify-center min-w-0 md:p-32 rounded-0 rounded-2xl">
            <Paper className="flex w-auto min-h-auto md:w-full md:max-w-6xl shadow overflow-hidden">
                <Box
                    className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
                    sx={{backgroundImage: 'url(assets/images/auth/auth4.png)', backgroundSize: 'cover'}}
                >
                </Box>

                <div className="w-full sm:w-auto p-48 md:p-64 rtl:border-r-1 ltr:border-l-1">
                    <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
                        <img className="w-96" src="assets/images/logo/eregulation-light.svg" alt="logo"/>

                        <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
                            Sign in
                        </Typography>
                        <div className="flex items-baseline mt-2 font-medium text-justify">
                            <Typography>Your smart solution for sensor regulation</Typography>
                        </div>

                        <form
                            name="loginForm"
                            noValidate
                            className="flex flex-col justify-center w-full mt-32"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Controller
                                name="email"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        className="mb-24"
                                        label="Email"
                                        type="email"
                                        error={!!errors.email}
                                        helperText={errors?.email?.message}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />
                                )}
                            />

                            <Controller
                                name="password"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        className="mb-24"
                                        label="Password"
                                        type="password"
                                        error={!!errors.password}
                                        helperText={errors?.password?.message}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />
                                )}
                            />

                            <Button
                                variant="contained"
                                color="secondary"
                                className=" w-full mt-16"
                                aria-label="Sign in"
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                                type="submit"
                                size="large"
                            >
                                Sign in
                            </Button>
                        </form>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default SignInPage;
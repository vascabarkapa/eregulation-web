import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';

const schema = yup.object().shape({
  name: yup.string().required('You must enter your name'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
});

const defaultValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  acceptTermsConditions: false,
};

function SignUpPage() {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit({ name, password, email }) {
    jwtService
      .createUser({
        name,
        password,
        email,
      })
      .then((user) => {
        // No need to do anything, registered user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        _errors.forEach((error) => {
          setError(error.type, {
            type: 'manual',
            message: error.message,
          });
        });
      });
  }

  return (
    <div className="flex flex-col flex-auto items-center justify-center min-w-0 md:p-32 rounded-0 rounded-2xl">
      <Paper className="flex mx-0 sm:mx-0 w-auto min-h-auto md:w-full md:max-w-6xl shadow overflow-hidden">
        <Box
          className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
          sx={{ backgroundImage: 'url(assets/images/auth/auth6.png)', backgroundSize: 'cover' }}
        >
        </Box>

        <div className="w-full sm:w-auto p-48 md:p-64 rtl:border-r-1 ltr:border-l-1">
          <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
            <img className="w-96" src="assets/images/logo/eregulation-light.svg" alt="logo" />

            <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
              Sign up
            </Typography>
            <div className="flex items-baseline mt-2 font-medium">
              <Typography>Already have an account?</Typography>
              <Link className="ml-4" to="/sign-in">
                Sign in
              </Link>
            </div>

            <form
              name="registerForm"
              noValidate
              className="flex flex-col justify-center w-full mt-32"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Name"
                    autoFocus
                    type="name"
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    variant="outlined"
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
                render={({ field }) => (
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

              <Controller
                name="passwordConfirm"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Password (Confirm)"
                    type="password"
                    error={!!errors.passwordConfirm}
                    helperText={errors?.passwordConfirm?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                name="acceptTermsConditions"
                control={control}
                render={({ field }) => (
                  <FormControl className="items-center" error={!!errors.acceptTermsConditions}>
                    <FormControlLabel
                      label="I agree to the Terms of Service and Privacy Policy"
                      control={<Checkbox size="small" {...field} />}
                    />
                    <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
                  </FormControl>
                )}
              />

              <Button
                variant="contained"
                color="secondary"
                className=" w-full mt-24"
                aria-label="Register"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                Create your account
              </Button>
            </form>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default SignUpPage;

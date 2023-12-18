import SignInPage from './SignInPage';
import authRoles from '../../auth/authRoles';
import { Navigate } from 'react-router-dom';

const ACCESS_TOKEN = localStorage.getItem("access_token");

const SignInConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'sign-in',
      element: !ACCESS_TOKEN ? <SignInPage /> : <Navigate to="/" />,
    },
  ],
};

export default SignInConfig;

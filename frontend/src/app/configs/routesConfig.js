import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import PagesConfig from "../main/PagesConfig";

const ACCESS_TOKEN = localStorage.getItem("access_token");
const routeConfigs = ACCESS_TOKEN ? [PagesConfig, SignOutConfig, SignInConfig, SignUpConfig] :
  [SignOutConfig, SignInConfig, SignUpConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: '/',
    element: ACCESS_TOKEN ? <Navigate to="/dashboard" /> : <Navigate to="sign-in" />,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
    element: ACCESS_TOKEN ? <FuseLoading /> : <Navigate to="sign-in" />,
  },
  {
    path: '404',
    element: <Error404Page />,
    element: ACCESS_TOKEN ? <Error404Page /> : <Navigate to="sign-in" />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
    element: ACCESS_TOKEN ? <Navigate to="404" /> : <Navigate to="sign-in" />,
  },
];

export default routes;
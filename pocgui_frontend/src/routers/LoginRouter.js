import React, { lazy } from "react";
import { LoginLayout } from "../layout";

const Login = lazy(() => import("../pages/authentication/login"));

const LoginRouter = {
  path: '/',
  element: <LoginLayout />,
  children: [
    {path: '/', element: <Login />},
    {path: 'login', element: <Login />}
  ]
};

export default LoginRouter;
import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <>
    <Outlet />
    </>
  )
};

export default LoginLayout;
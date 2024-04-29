import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
};

export default LoginLayout;
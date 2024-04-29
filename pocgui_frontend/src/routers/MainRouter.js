import React from "react";
import { MainLayout } from "../layout";

const MainRouter = {
  path: '/modules',
  element: <MainLayout />,
  children: [
    // { path: 'settings/MenuConfigManage', element: <MenuConfigManage /> }
  ]
};

export default MainRouter;
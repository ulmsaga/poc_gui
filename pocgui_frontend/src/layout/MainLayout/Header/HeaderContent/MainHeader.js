import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { IconButton, Toolbar } from "@mui/material";
import MiddleModuleTitle from "../MiddleModuleTitle.js";
import RightContent from "../RightContent";

const MainHeader = ({ open, handleDrawerToggle }) => {
  return (
    <Toolbar style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#1a2335'}}>
      <IconButton
        disableRipple
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        sx={{ color: (theme) => theme.palette.grey[200], ml: { xs: 0, lg: -2 }, border: (theme) => '0.5px solid ' + theme.palette.grey[200] }}
      >
        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>
      <MiddleModuleTitle />
      <RightContent />
    </Toolbar>
  );
};

export default MainHeader;
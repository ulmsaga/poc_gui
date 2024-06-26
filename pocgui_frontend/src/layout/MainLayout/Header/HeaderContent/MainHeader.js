import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { IconButton, Toolbar } from "@mui/material";
import MiddleModuleTitle from "../MiddleModuleTitle.js";
import RightContent from "../RightContent";

const MainHeader = ({ open, handleDrawerToggle }) => {
  const iconBackColor = 'grey.100';
  const iconBackColorOpen = 'grey.200';

  return (
    <Toolbar style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#1a2335'}}>
      <IconButton
        disableRipple
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 } }}
      >
        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>
      <MiddleModuleTitle />
      <RightContent />
    </Toolbar>
  );
};

export default MainHeader;
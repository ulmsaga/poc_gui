import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { currentMenuInfo } from "store/reducers/menu";

const MiddleModuleTitle = () => {

  const menuInfo = useSelector(currentMenuInfo);
  const title = menuInfo.menu_name;
  const titleLeftMargin = 200

  return (
    <div style={{ marginLeft: titleLeftMargin }} >
      <Typography variant="h3" sx={{ color: (theme) => theme.palette.grey[200] }} >{title}</Typography>
    </div>
  );
}

export default MiddleModuleTitle;
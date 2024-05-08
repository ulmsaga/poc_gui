import { Backdrop } from "@mui/material";
import React from "react";
import loadingGif from "assets/images/comm/loading_1.gif";

const LoadingLayer = ({isLoading}) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => {console.log(theme.zIndex.drawer); return theme.zIndex.drawer + 1;} }}
      open={isLoading}
    >
      <div>
        <div>
          <p><img src= {loadingGif} alt= "로딩중" /></p>
          <span>로딩중..</span>
        </div>
      </div>
    </Backdrop>
  );
};

export default LoadingLayer;
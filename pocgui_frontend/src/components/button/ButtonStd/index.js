import React, { Fragment } from "react";

import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { CancelOutlined, CheckOutlined, DownloadOutlined, SearchOutlined } from "@mui/icons-material";
import PropTypes from "prop-types";

const ButtonStyled = styled(Button)(({ theme, variant }) => ({
  ...theme.typography[variant]
}));



const ButtonStd = ({ label, variant, color, onClick, iconType }) => {
  // Default Values
  const tmp = {
    variant: variant ? variant : "contained",
    color: color ? color : "primary"
  };

  const Icon = () => {
    if (iconType === "" || iconType === undefined || iconType === null) {
      return (
        <CheckOutlined fontSize="small" />
      );
    }
    return (
      <Fragment>
        { (iconType === 'search') && <SearchOutlined fontSize="small" /> }
        { (iconType === 'download') && <DownloadOutlined fontSize="small" /> }
        { (iconType === 'confirm') && <CheckOutlined fontSize="small" /> }
        { (iconType === 'close') && <CancelOutlined fontSize="small" /> }
      </Fragment>
    )
  };

  return (
    // <Button variant="contained" color='primary' startIcon={<CheckOutlined fontSize="small" />} onClick={ (e) => {contentCallBack()} }>적용</Button>
    <ButtonStyled {...tmp} variant={tmp.variant} color={tmp.color} startIcon={<Icon/>} onClick={onClick}>
      {label}
    </ButtonStyled>
  );
}


// ButtonStd.PropTypes = {
//   variant: PropTypes.oneOf(["contained", "outlined", "text"]),
//   color: PropTypes.oneOf(["primary", "secondary"]),
//   label: PropTypes.string,
//   onClick: PropTypes.func,    
//   iconType: PropTypes.oneOf(["search", "download", "confirm", "close"]),
// }

ButtonStd.propTypes = {
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  color: PropTypes.oneOf(["primary", "secondary"]),
  iconType: PropTypes.oneOf(["search", "download", "confirm", "close"]),
};

export default ButtonStd;
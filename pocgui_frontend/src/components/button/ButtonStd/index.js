import React, { Fragment } from "react";

import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { CheckOutlined, CloseOutlined, DownloadOutlined, SearchOutlined } from "@mui/icons-material";
import PropTypes from "prop-types";

const ButtonStyled = styled(Button)(({ theme, variant }) => ({
  ...theme.typography[variant]
}));

const ButtonStd = ({ label, variant, color, onClick, width, style, iconType }) => {
  // Default Values
  const tmp = {
    variant: variant ? variant : "contained",
    color: color ? color : "primary",
    // sx: { textTransform: 'none', fontSize: '0.8rem', padding: '0.3rem 0.5rem', borderRadius: '0.2rem' }
    width: width === undefined ? '100px' : width,
  };

  style = style === undefined ? { textTransform: 'none', fontSize: '0.8rem', padding: '0.3rem 0.5rem', borderRadius: '0.1rem' } : style;

  const Icon = () => {
    if (iconType === "" || iconType === undefined || iconType === null) {
      return (
        <CloseOutlined fontSize="small" />
      );
    }
    return (
      <Fragment>
        { (iconType === 'search') && <SearchOutlined fontSize="small" /> }
        { (iconType === 'download') && <DownloadOutlined fontSize="small" /> }
        { (iconType === 'confirm') && <CheckOutlined fontSize="small" /> }
        { (iconType === 'close') && <CloseOutlined fontSize="small" /> }
      </Fragment>
    )
  };

  return (
    <ButtonStyled
      {...tmp} 
      variant={ tmp.variant }
      color={ tmp.color }
      sx={{ width: tmp.width, ...style }}
      startIcon={ <Icon/> }
      onClick={ onClick }>
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
import React from 'react';
import { styled } from '@mui/material/styles';

const TypographyStyled = styled('div')(({ theme, variant }) => ({
  ...theme.typography[variant]
}));

const TypoLabel = ({ label, variant, paddingTop, width, style, bgType }) => {
  // Default Values
  const tmp = {
    variant: variant ? undefined : 'body2',
    paddingTop: paddingTop === undefined ? 0.5 : paddingTop,
    width: width === undefined ? '120px' : width,
  };
  
  // Default SkyBlue2 Type
  style = style === undefined ? { textAlign: 'center', border: '0.5px solid #abbccb', background: '#eff6fc', borderRadius: '0px' } : style;
  
  if (bgType !== undefined) {
    if (bgType === 'gray') {
      // Gray Type
      style = { textAlign: 'center', border: '0.5px solid #9fa2a7', background: '#f5f7f7', borderRadius: '0px' };
    } else if (bgType === 'skyblue1') {
      // SkyBlue1 Type
      style = { textAlign: 'center', border: '0.5px solid #abbccb', background: '#d8edff', borderRadius: '0px' };
    } else if (bgType === 'skyblue2') {
      // SkyBlue2 Type
      // style = { textAlign: 'center', border: '0.5px solid #abbccb', background: '#e6f4ff', borderRadius: '0px' };
      style = { textAlign: 'center', border: '0.5px solid #abbccb', background: (theme) => theme.palette.info.light[300], borderRadius: '0px' };
    }
  }

  return (
  <TypographyStyled
    {...tmp}
    sx={{
      paddingTop: tmp.paddingTop,
      width: tmp.width,
      ...style
    }}
  >{label}
  </TypographyStyled>);
};


// Declare default props
/*
TypoLabel.defaultProps = {
  label: "",
  variant: "body2",
  paddingTop: 0.5,
  width: '120px',
  style: { textAlign: 'center', border: '0.5px solid #9fa2a7', background: '#f5f7f7', borderRadius: '0px' }
};
*/

export default TypoLabel;
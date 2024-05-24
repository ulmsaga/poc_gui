import React from 'react';
import { styled } from '@mui/material/styles';

const TypographyStyled = styled('div')(({ theme, variant }) => ({
  ...theme.typography[variant]
}));

const TypoLabel = ({ label, variant, paddingTop, width, style }) => {
  // Default Values
  const tmp = {
    variant: variant ? undefined : 'body2',
    paddingTop: paddingTop === undefined ? 0.5 : paddingTop,
    width: width === undefined ? '120px' : width,
  };

  // Gray Type
  // style = style === undefined ? { textAlign: 'center', border: '0.5px solid #9fa2a7', background: '#f5f7f7', borderRadius: '0px' } : style;

  // SkyBlue1 Type
  // style = style === undefined ? { textAlign: 'center', border: '0.5px solid #abbccb', background: '#d8edff', borderRadius: '0px' } : style;

  // SkyBlue2 Type
  style = style === undefined ? { textAlign: 'center', border: '0.5px solid #abbccb', background: '#e6f4ff', borderRadius: '0px' } : style;
  
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
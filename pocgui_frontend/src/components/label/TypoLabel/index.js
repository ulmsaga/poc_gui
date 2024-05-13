import * as React from 'react';
import { styled } from '@mui/material/styles';

const TypographyStyled = styled('div')(({ theme, variant }) => ({
  ...theme.typography[variant]
}));

const TypoLabel = ({ label, variant, paddingTop, width, style }) => {
  const tmp = {
    variant: variant
  };
  return (
  <TypographyStyled
    {...tmp}
    sx={{
      paddingTop: paddingTop,
      width: width,
      ...style
    }}
  >{label}
  </TypographyStyled>);
};

TypoLabel.defaultProps = {
  label: "",
  variant: "body2",
  paddingTop: 0.5,
  width: '120px',
  // style: { textAlign: 'center', border: '0.5px solid #9fa2a7', background: '#f5f7f7', borderRadius: '0px' }
  style: { textAlign: 'center', border: '0.5px solid #9fa2a7', background: '#f5f7f7', borderRadius: '0px' }
};

export default TypoLabel;
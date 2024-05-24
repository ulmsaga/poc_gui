import React, { Fragment } from 'react';
import { styled } from '@mui/material/styles';

const TypographyStyled = styled('div')(({ theme, variant }) => ({
  ...theme.typography[variant]
}));

const TypoLableNoLine = ({ label, variant, paddingTop, width, style }) => {
  // Default Values
  const tmp = {
    variant: variant ? undefined : 'body2',
    paddingTop: paddingTop === undefined ? 0.5 : paddingTop,
    width: width === undefined ? '120px' : width,
  };
  style = style === undefined ? { textAlign: 'left' } : style;

  return (
    <Fragment>
      <TypographyStyled
        {...tmp}
        sx={{
          paddingTop: tmp.paddingTop,
          width: tmp.width,
          ...style
        }}
      >{label}
      </TypographyStyled>
    </Fragment>
  );
};

export default TypoLableNoLine;
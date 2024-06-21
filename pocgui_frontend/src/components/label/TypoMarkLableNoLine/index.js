import React from 'react';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

const TypographyStyled = styled('div')(({ theme, variant }) => ({
  ...theme.typography[variant]
}));

const TypoMarkLableNoLine = ({ label, variant, paddingTop, width, style }) => {
  // Default Values
  const tmp = {
    variant: variant ? undefined : 'body2',
    paddingTop: paddingTop === undefined ? 0.5 : paddingTop,
    width: width === undefined ? '120px' : width,
  };
  style = style === undefined ? { textAlign: 'left' } : style;

  return (
    <Stack direction={'row'} spacing={0.1} m={0} p={0}>
      <TypographyStyled
        {...tmp}
        sx={{
          paddingTop: tmp.paddingTop,
          width: tmp.width,
          fontWeight: 'bold',
          fontSize: '0.8rem',
          '&:before': {
            display: 'inline-block',
            content: '""',
            width: '5px',
            height: '6px',
            marginTop: '-3px',
            marginLeft: '5px',
            marginRight: '5px',
            backgroundColor: '#42a6fd',
            borderRadius: '4px',
            verticalAlign: 'middle'
          },
          ...style
        }}
      >{label}
      </TypographyStyled>
    </Stack>
  );
};

export default TypoMarkLableNoLine;
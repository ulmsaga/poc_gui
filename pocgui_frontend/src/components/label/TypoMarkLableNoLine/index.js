import React from 'react';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { FiberManualRecordTwoTone } from '@mui/icons-material';

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
      <FiberManualRecordTwoTone fontSize='small' style={{ marginTop: '2px' }} sx={{ paddingTop: 0.2, color: '#87c5fc' }}/>
      <TypographyStyled
        {...tmp}
        sx={{
          paddingTop: tmp.paddingTop,
          width: tmp.width,
          ...style
        }}
      >{label}
      </TypographyStyled>
    </Stack>
  );
};

export default TypoMarkLableNoLine;
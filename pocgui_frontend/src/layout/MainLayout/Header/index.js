import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { AppBar, useMediaQuery } from '@mui/material';

import AppBarStyled from './AppBarStyled';
import MainHeader from './HeaderContent/MainHeader';

const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  // app-bar params
  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      boxShadow: theme.customShadows.z1
    }
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={ open } {...appBar}>
          <MainHeader  open={ open } handleDrawerToggle={ handleDrawerToggle }/>
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}><MainHeader /></AppBar>
      )}
    </>
  );
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func
};

export default Header;

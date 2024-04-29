import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import LoginBackground from 'assets/images/login/LoginBackground';
import LoginCard from './LoginCard';
import LoginFooter from 'components/cards/LoginFooter';

const LoginWrapper = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh'}}>
      <LoginBackground />
      <Grid container direction="column" justifyContent="flex-end" sx={{minHeight: '100vh'}}>
        <Grid item xs={12} sx={{ ml:3, mt: 3 }}>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} container justifyContent="center" alignItems="center" sx={{ minHeight: {xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)'} }}>
            <Grid item>
              <LoginCard>
                {children}
              </LoginCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <LoginFooter />
        </Grid>
      </Grid>
    </Box>
  );
};

LoginWrapper.prototype = {
  children: PropTypes.node
};

export default LoginWrapper;
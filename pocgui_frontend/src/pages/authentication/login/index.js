import React from "react";
import LoginWrapper from "./items/LoginWrapper";
import { Grid, Stack, Typography } from "@mui/material";
import AuthLogin from "./items/AuthLogin";

const Login = () => {
  return (
    <LoginWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </LoginWrapper>
  );
};

export default Login;
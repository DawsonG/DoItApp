import React from 'react';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import { SnackbarContent } from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Done from 'material-ui-icons/Done';

import StyledPaper from './StyledPaper';

const StyledSnackbarContent = styled(SnackbarContent)`
  && {
    color: #fff;
    background-color: #2196F3;
  }
`;

const FlexSpread = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Login = ({email, password, emailError, passwordError, changeEmail, changePassword, handleSubmit, message}) => (
  <StyledPaper>
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Typography type="headline" gutterBottom>
        Login
      </Typography>

      {message && (<StyledSnackbarContent
        message={message}
      />)}

      <TextField
        id="email"
        label="Email"
        error={emailError}
        value={email}
        onChange={changeEmail}
        helperText={emailError ? 'Email is required!' : ''}
        margin="normal"
        fullWidth
      />

      <TextField
        id="password"
        type="password"
        label="Password"
        error={passwordError}
        value={password}
        onChange={changePassword}
        autoComplete="current-password"
        helperText={passwordError ? 'Password is required!' : ''}
        margin="normal"
        fullWidth
      />

      <FlexSpread>
        <Button href="/register">
          Register
        </Button>
        <Button type="submit" color="primary" raised dense>
          Sign In
          <Done className="icon-right" />
        </Button>
      </FlexSpread>
    </form>
  </StyledPaper>
);

export default Login;

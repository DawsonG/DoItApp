import React from 'react';
import styled from 'styled-components';
import { SnackbarContent } from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Done from 'material-ui-icons/Done';

import StyledPaper from '../components/StyledPaper';

const StyledSnackbarContent = styled(SnackbarContent)`
  && {
    color: #fff;
    background-color: #EF5350;
  }
`;

const RightAlign = styled.div`
  text-align:right;
`;

const Register = ({
  username,
  changeUsername,
  usernameError,
  email,
  changeEmail,
  emailError,
  password,
  passwordError,
  passwordConfirm,
  passwordConfirmError,
  changePassword,
  changePasswordConfirm,
  isValid,
  error,
  errorMessage,
  handleSubmit
}) => (
  <StyledPaper>
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Typography type="headline" gutterBottom>
        Register
      </Typography>

      {!isValid && (<StyledSnackbarContent
        message="All fields are required."
      />)}

      {error && (<StyledSnackbarContent
        message={errorMessage}
      />)}

      <TextField
        id="username"
        label="Username"
        error={usernameError}
        value={username}
        onChange={changeUsername}
        helperText={usernameError ? 'Email is required!' : ''}
        margin="normal"
        fullWidth
      />

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
        helperText={passwordError ? 'Password is required!' : ''}
        margin="normal"
        fullWidth
      />

      <TextField
        id="confirm-password"
        type="password"
        label="Confirm Password"
        error={passwordConfirmError}
        value={passwordConfirm}
        onChange={changePasswordConfirm}
        helperText={passwordConfirmError ? 'Password must match!' : ''}
        margin="normal"
        fullWidth
      />

      <RightAlign>
        <Button type="submit" color="primary" raised dense>
          Register
          <Done className="icon-right" />
        </Button>
      </RightAlign>
    </form>
  </StyledPaper>
);

export default Register;
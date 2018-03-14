import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { actions, selectors } from '../modules/user';
import Register from '../components/Register';

class RegisterContainer extends PureComponent {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    emailError: false,
    passwordError: false,
    passwordConfirmError: false,
    isValid: true,
  }

  changeEmail = e => {
    this.setState({ email: e.target.value });
  }

  changePassword = e => {
    this.setState({
      password: e.target.value,
      passwordConfirmError: e.target.value !== this.state.password
    });
  }

  changePasswordConfirm = e => {
    this.setState({
      passwordConfirm: e.target.value,
      passwordConfirmError: e.target.value !== this.state.password
    });
  }

  changeUsername = e => {
    this.setState({ username: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();

    const {
      username,
      email,
      password,
      passwordConfirm,
      isValid,
    } = this.state;

    const { registerUser } = this.props;
    
    if (email && password && password === passwordConfirm) {
      registerUser(username, email, password);
    } else {
      this.setState({ isValid: false });
    }
  }

  render() {
    return (
      <Register
        {...this.state}
        error={this.props.error}
        errorMessage={this.props.message}
        changeUsername={this.changeUsername}
        changeEmail={this.changeEmail}
        changePassword={this.changePassword}
        changePasswordConfirm={this.changePasswordConfirm}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  error: selectors.error(state),
  message: selectors.message(state),
});

const mapDispatchToProps = dispatch => ({
  registerUser(username, email, password) {
    dispatch(actions.registerUser({ username, email, password }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
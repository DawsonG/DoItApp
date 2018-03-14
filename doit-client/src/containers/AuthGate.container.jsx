import React, { Component } from 'react';
import { bool } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Login from 'components/Login';
import List from 'containers/List.container';
import AppBarContainer from 'containers/AppBar.container';

import { actions } from 'modules/user';
import { localStorageGetString } from 'lib/storageManager';

class AuthGateContainer extends Component {
  static propTypes = {
    isLoggedIn: bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
    };
  }

  componentWillMount() {
    this.props.loadUserFromToken();
  }

  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  changePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { authenticateUser } = this.props;
    const { email, password } = this.state;

    if (email && password) {
      authenticateUser(email, password);
    } else {
      this.setState({
        emailError: !!!email,
        passwordError: !!!password,
      });
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return (
        <div>
          <AppBarContainer />

          <Switch>
            <Route path="/list" component={List} />

            <Redirect to="/list" />
          </Switch>
        </div>
      );
    }

    return <Login {...this.state} changeEmail={this.changeEmail} changePassword={this.changePassword} handleSubmit={this.handleSubmit} />;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  isLoggedIn: state.user.loggedIn
});

const mapDispatchToProps = (dispatch) => ({
  loadUserFromToken() {
    let token = localStorageGetString('token');
    if (!token) {
      return;
    }

    dispatch(actions.userFromToken(token));
  },
  authenticateUser(email, password) {
    dispatch(actions.authUser({ email, password }));
  }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(AuthGateContainer);

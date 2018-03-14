import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { actions } from 'modules/user';

const TypographyFlex = styled(Typography)`
  flex: 1;
`;

class AppBarContainer extends Component {
  render() {
    const { logout } = this.props;

    return (
      <AppBar position="static">
        <div className="container">
          <Toolbar>
            <TypographyFlex type="title" color="inherit">
              The Do-It App
            </TypographyFlex>
            <Button onClick={logout} color="inherit">Logout</Button>
          </Toolbar>
        </div>
      </AppBar>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout() {
    dispatch(actions.logout());
  }
});

export default connect(null, mapDispatchToProps)(AppBarContainer);

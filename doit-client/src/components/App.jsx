import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Reboot from 'material-ui/Reboot';

import AuthGate from 'containers/AuthGate.container';
import Register from 'containers/Register.container';

const App = () => (<div>
  <Reboot />

  <Switch>
    <Route path="/register" component={Register} />
    <Route path="/list" component={AuthGate} />

    <Redirect to="/list" />
  </Switch>
</div>);

export default App;

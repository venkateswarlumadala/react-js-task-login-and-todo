import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import LoginPage from './routeComponents/login';
import Dashboard from './routeComponents/dashboard';
import SignUp from './routeComponents/signUp';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={SignUp} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </React.Fragment>
  )
}

export default App;
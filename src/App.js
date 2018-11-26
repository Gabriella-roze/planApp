import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import LandingPage from './pages/Landing';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import PasswordForgetPage from './pages/PasswordForget';
import HomePage from './pages/Home';
import AccountPage from './pages/Account';
import AdminPage from './pages/Admin';

import * as ROUTES from './constants/routes';
import { withAuthentication } from './hocs/Session';
import { GlobalStateProvider } from './hocs/GlobalState';

const App = () => (
  <Router>
    <GlobalStateProvider>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} />
    </GlobalStateProvider>
  </Router>
);

export default withAuthentication(App);

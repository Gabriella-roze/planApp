import React, { Component } from 'react';
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
import { withFirebase } from './hocs/Firebase';
import { withGlobalState } from './hocs/GlobalState';

class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticating: true,
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    console.log('componentDidMount @ App.js: ', this.props);
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        console.log('authUser @ App.js: ', authUser);

        if (authUser) {
          this.props.firebase.getUser(authUser.uid)
          .then(dbUser => {
            this.props.globalState.changeUser(dbUser);
          })
          .catch(err => console.log(err))
        }
      }
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation />

          <hr />

          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route exact path={ROUTES.ADMIN} component={AdminPage} />
          </div>
      </Router>
    );
  }
}

export default withGlobalState(withFirebase(App));

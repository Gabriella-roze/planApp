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
import { GlobalStateProvider, withGlobalState } from './hocs/GlobalState';
import { withFirebase } from './hocs/Firebase';

import AuthenticatedRoute from './hocs/Session/AuthenticatedRoute';
import UnauthenticatedRoute from './hocs/Session/UnauthenticatedRoute';
import Routes from './routes/Routes';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticating: true,
      isAuthenticated: false
    };
  }

  async componentDidMount() {

    console.log('APP.JS: Adding a listener for AuthState changes: ', this.props);
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      async (authUser) => {
        console.log('APP.JS: AuthState changed - new authUser: ', authUser);

        if (authUser) {
          this.setState({ authUser });
          this.props.globalState.openFirestoreConnection(authUser.uid);

          // if (this.props.globalState && !this.props.globalState.user && this.state.authUser) {
      
            // console.log('APP.JS: No user at globalState - fetching user from DB');
            // const dbUser = await this.props.firebase.getUser(this.state.authUser.uid);

            // console.log('APP.JS: User fetched from db: ', dbUser);
            this.setState({ isAuthenticated: true, isAuthenticating: false }, () => {
              // console.log('APP.JS: Saving the dbUser to globalState and changing isAuthenticated: true');
              // this.props.globalState.changeUser(dbUser);
              // this.props.globalState.authenticate();              
            });
          }
        // }
        else {
          this.setState({ authUser: null });
          this.props.globalState.changeUser(null);
          this.props.globalState.unauthenticate();
          this.setState({ isAuthenticated: false, isAuthenticating: false })
        }
      },
    );
  }



  componentWillUnmount() {
    console.log('componentWillUnmount @ App: ', this.props);
    // Removing the authState listener
    this.listener();
  }

  renderAuthenticating() {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  render() {
    if (this.state.isAuthenticating) { return this.renderAuthenticating(); }

    const childProps = {
      isAuthenticated: this.props.globalState.isAuthenticated
    };

    console.log('childProps passed to routes: ', childProps);

    return (
      <Router>
        <div>
          <Navigation isAuthenticated={childProps.isAuthenticated} />

          <hr />

          <Routes childProps={childProps} />
          {/* <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route exact path={ROUTES.ADMIN} component={AdminPage} /> */}

        </div>
      </Router>
    );
  }
}

export default withGlobalState(withFirebase(App));

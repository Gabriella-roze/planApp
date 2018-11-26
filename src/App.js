import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './components/Navigation';
// import LandingPage from './pages/Landing';
// import SignUpPage from './pages/SignUp';
// import SignInPage from './pages/SignIn';
// import PasswordForgetPage from './pages/PasswordForget';
// import HomePage from './pages/Home';
// import AccountPage from './pages/Account';
// import AdminPage from './pages/Admin';

// import * as ROUTES from './constants/routes';
// import { withAuthentication } from './hocs/Session';
import { withGlobalState } from './hocs/GlobalState';
import { withFirebase } from './hocs/Firebase';

// import AuthenticatedRoute from './hocs/Session/AuthenticatedRoute';
// import UnauthenticatedRoute from './hocs/Session/UnauthenticatedRoute';
import Routes from './routes/Routes';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

    console.log('APP.JS: Adding a listener for AuthState changes: ', this.props);
    this.props.globalState.startLoading();

    this.unsubscribe = this.props.firebase.auth.onAuthStateChanged(authUser => {
      console.log('APP.JS: AuthState changed - new authUser: ', authUser);

      if (authUser) {
        this.setState({ authUser });
        // this.props.globalState.openFirestoreConnection(authUser.uid);

        const dbUser = this.props.firebase.getUser(authUser.uid);

        this.props.globalState.changeUser(dbUser);

        this.props.globalState.stopLoading();
      }
      else {
        this.setState({ authUser: null });
        this.props.globalState.changeUser(null);
        this.props.globalState.stopLoading();
      }
    });
  }

  componentWillUnmount() {
    console.log('APP.JS: componentWillUnmount fired with props: ', this.props);
    // Removing the authState listener
    this.unsubscribe();
  }

  // Change to a cool loading overlay
  renderAuthenticating() {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  render() {
    if (this.props.globalState.isLoading) { return this.renderAuthenticating(); }

    const childProps = {
      isAuthenticated: this.props.globalState.user ? true : false
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

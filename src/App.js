import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { withGlobalState } from './hocs/GlobalState';
import { withFirebase } from './hocs/Firebase';

import Navigation from './components/Navigation';
import Routes from './routes/Routes';

class App extends React.Component {

  componentDidMount() {
    this.props.globalState.startLoading();

    /**
     * Start a two-way communication between firebase and our app.
     * This method is called automatically everytime there is a change 
     * to the users authentication. (he logs in or logs out)
     */
    this.unsubscribe = this.props.firebase.auth.onAuthStateChanged( async authUser => {
      if (authUser) {
        // Fetch the rest of the user details from the database
        try {
          const dbUser = await this.props.firebase.getUser(authUser.uid);

          if (dbUser.exists) {
            this.props.globalState.changeUser(dbUser.data());
            this.props.globalState.stopLoading();
          }

        } catch (error) {
          console.log('error: ', error);
        }
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



  render() {
    const childProps = { isAuthenticated: this.props.globalState.user ? true : false };
    console.log('childProps passed to routes: ', childProps);

    return (
      <Router>
        <div>
          <Navigation isAuthenticated={childProps.isAuthenticated} />

          <Routes childProps={childProps} />
        </div>
      </Router>
    );
  }
}

export default withGlobalState(withFirebase(App));

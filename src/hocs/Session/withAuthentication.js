import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
// import { withGlobalState } from '../GlobalState';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    async componentDidMount() {
      console.log('componentDidMount @ withAuthentication: ', this.props);

      if (this.props.globalState && !this.props.globalState.user && this.state.authUser) {
        console.log('Getting user from authUser: ', this.state.authUser);

        const dbUser = await this.props.firebase.getUser(this.state.authUser.uid);
        console.log('Got the user: ', dbUser);
        this.props.globalState.changeUser(dbUser);
      }

      this.listener = this.props.firebase.auth.onAuthStateChanged(
        async (authUser) => {
          console.log('authUser @ withAuthentication @ listener: ', authUser);
          console.log('this.props: ', this.props);

          if (authUser) {
            this.setState({ authUser });
          }
          else {
            this.setState({ authUser: null });
          }
        },
      );
    }

    componentWillUnmount() {
      console.log('componentWillUnmount @ withAuthentication: ', this.props);
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;

import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { withGlobalState } from '../GlobalState';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    async componentDidMount() {
      console.log('componentDidMount @ withAuthorization: ', this.props);

      if (!this.props.globalState.user && this.state.authUser) {
        console.log('Getting user from authUser: ', this.state.authUser);

        const dbUser = await this.props.firebase.getUser(this.state.authUser.uid);
        console.log('Got the user: ', dbUser);
        this.props.globalState.changeUser(dbUser);
      }
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          } else {
            this.setState({ authUser });
          }
        },
      );
    }

    componentWillUnmount() {
      console.log('componentWillUnmount @ withAuthorization: ', this.props);
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withGlobalState,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;

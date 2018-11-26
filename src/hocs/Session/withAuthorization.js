import React from 'react';
// import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

// import AuthUserContext from './context';
// import { withFirebase } from '../Firebase';
// import * as ROUTES from '../../constants/routes';
import { withGlobalState } from '../GlobalState';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        isAuthorized: false
      };
    }

    async componentDidMount() {
      console.log('componentDidMount @ withAuthorization: ', this.props);

      if (this.props.globalState.user) { 
        this.setState({ isAuthorized: true });
      }
      else {
        this.setState({ isAuthorized: false });
      }

      // this.listener = this.props.firebase.auth.onAuthStateChanged(
      //   async (authUser) => {
      //     if (!condition(authUser)) {
      //       this.props.history.push(ROUTES.SIGN_IN);
      //     } else {
      //       this.setState({ authUser });

      //       // console.log('this.props: ', this.props);
            
      //       // if (!this.props.globalState.user && this.state.authUser) {
      //       //   console.log('Getting user from authUser: ', this.state.authUser);
      
      //       //   const dbUser = await this.props.firebase.getUser(this.state.authUser.uid);
      //       //   console.log('Got the user: ', dbUser);
      //       //   this.props.globalState.changeUser(dbUser);
      //       // }
            
      //     }
      //  },
      // );
    }

    componentWillUnmount() {
      console.log('componentWillUnmount @ withAuthorization: ', this.props);
      // this.listener();
    }

    render() {
      return (
        <div>
          { this.state.isAuthorized 
            ? <Component {...this.props} />
            : <p>Not authorized!</p>
          }
        </div>
      );
    }
  }

  return compose(
    // withRouter,
    withGlobalState,
   //  withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;

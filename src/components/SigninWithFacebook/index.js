import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';

class SigninWithFacebook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: ''
    };
  }


  invalidForm = () => this.state.password === '' || this.state.email === ''

  onSubmit = async (event) => {
    event.preventDefault();
    try {
      // Login with facebook at Firebase authentication system (creates a new user if it's the first time) 
      const authUser = await this.props.firebase.doSignInWithFacebook();

      // If a new user was created, we create a document for him in the Firestore database
      if (authUser && authUser.additionalUserInfo.isNewUser) {
        console.log('authUser: ', authUser);

        // Check if the facebook profile has a picture and included it to 
        await this.props.firebase.createUser({
          name: authUser.user.displayName,
          email: authUser.user.email,
          uid: authUser.user.uid,
          facebookDetails: authUser.additionalUserInfo.profile
        });
      }

    } catch (error) {
      console.log('error: ', error);
      this.setState({ error });
    }
  };

  render() {
    const error = this.state.error;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Continue with Facebook</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default compose(
  withFirebase,
  withGlobalState
)(SigninWithFacebook);

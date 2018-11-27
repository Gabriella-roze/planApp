import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';

class SigninWithFacebook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };
  }


  invalidForm = () => this.state.password === '' || this.state.email === ''

  onSubmit = async (event) => {
    event.preventDefault();
    console.log('going with fb');
    this.props.firebase.doSignInWithFacebook();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Continue with Facebook</button>
      </form>
    );
  }
}

export default compose(
  withFirebase,
  withGlobalState
)(SigninWithFacebook);

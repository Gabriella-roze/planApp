import React, { Component, Fragment } from 'react';

import SigninForm from '../../components/SigninForm';
import SigninWithFacebook from '../../components/SigninWithFacebook';
import SignupForm from '../../components/SignupForm';
import PasswordForgetForm from '../../components/PasswordForget';

class Landing extends Component {
  render() {
    return (
      <Fragment>
        <h1>Landing Page</h1>

        <h3>Signin form</h3>
        <SigninForm />

        <h3>Signin with facebook</h3>
        <SigninWithFacebook />

        <h3>Signup form</h3>
        <SignupForm />

        <h3>PasswordForget form</h3>
        <PasswordForgetForm />

      </Fragment>
    );
  }
}

export default Landing;
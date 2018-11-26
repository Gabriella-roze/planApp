import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const { name, email, passwordOne } = this.state;

    try {
      // Create a user in the firebase - authentication system
      const authUser = await this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne);

      // Create a user document in firebase - firestore database
      await this.props.firebase.createUser({ name, email, uid: authUser.user.uid });

      // Update the globalState with the new user
      this.props.globalState.changeUser({ name, email, uid: authUser.user.uid });

      // Clear the form and redirect to home page
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.HOME);

    } catch (error) {
      console.error("Error @ signup: ", error);
      this.setState({ error });
    }
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      name === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="name"
          value={name}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

// const SignUpForm = withRouter(withFirebase(SignUpFormBase));

const SignUpForm = compose(
  withRouter,
  withFirebase,
  withGlobalState
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };

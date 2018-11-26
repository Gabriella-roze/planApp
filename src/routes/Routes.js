import React from "react";
import { Route, Switch } from "react-router-dom";

import Navigation from './components/Navigation';
import LandingPage from './pages/Landing';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import PasswordForgetPage from './pages/PasswordForget';
import HomePage from './pages/Home';
import AccountPage from './pages/Account';
import AdminPage from './pages/Admin';

import * as ROUTES from './constants/routes';
import { withFirebase } from './hocs/Firebase';
import { withGlobalState } from './hocs/GlobalState';

import AuthenticatedRoute from "../wrappers/AuthenticatedRoute";
import UnauthenticatedRoute from "../wrappers/UnauthenticatedRoute";

export default ({ childProps }) =>
  <Switch>
    <AuthenticatedRoute path="/" exact component={Landing} props={childProps} />
    <AuthenticatedRoute path="/admin" exact component={Admin} props={childProps} />
    <UnauthenticatedRoute path="/signin" exact component={Signin} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <UnauthenticatedRoute path="/forgotpassword" exact component={ForgotPassword} props={childProps} />
    <UnauthenticatedRoute path="/resetpassword/:token" exact component={ResetPassword} props={childProps} />
    <AuthenticatedRoute path="/signout" exact component={Signout} props={childProps}  />
    <UnauthenticatedRoute path="/socialredirect" exact component={SocialRedirect} props={childProps} />

    <AuthenticatedRoute path="/testpage" exact component={TestPage} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;


/*
*
* AuthenticatedRoute routes will only be available to logged in users, otherwise they will be
* redirected to the login page
*
* UnauthenticatedRoute routes will be available to logged out users, otherwise they will be
* redirected to the home page
*
*/
import React from "react";
import { Switch } from "react-router-dom";

import Landing from '../pages/Landing';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import PasswordForget from '../pages/PasswordForget';
import Home from '../pages/Home';
import Account from '../pages/Account';
import Admin from '../pages/Admin';

// import * as ROUTES from './constants/routes';
// import { withFirebase } from './hocs/Firebase';
// import { withGlobalState } from './hocs/GlobalState';

import AuthenticatedRoute from "../hocs/Session/AuthenticatedRoute";
import UnauthenticatedRoute from "../hocs/Session/UnauthenticatedRoute";

export default ({ childProps }) =>
  <Switch>
    <UnauthenticatedRoute path="/" exact component={Landing} props={childProps} />
    <AuthenticatedRoute path="/admin" exact component={Admin} props={childProps} />
    <UnauthenticatedRoute path="/signin" exact component={SignIn} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={SignUp} props={childProps} />
    <AuthenticatedRoute path="/forgotpassword" exact component={PasswordForget} props={childProps} />
    <AuthenticatedRoute path="/home" exact component={Home} props={childProps} />
    <AuthenticatedRoute path="/account" exact component={Account} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    {/* <Route component={NotFound} /> */}
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
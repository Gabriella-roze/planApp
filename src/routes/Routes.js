import React from "react";
import { Switch } from "react-router-dom";

import Landing from '../pages/Landing';
import PasswordForget from '../components/PasswordForget';
import Home from '../pages/Home';
import Account from '../pages/Account';
import Admin from '../pages/Admin';

import { AuthenticatedRoute, UnauthenticatedRoute } from "../hocs/RouteWrappers";

export default ({ childProps }) =>
  <Switch>
    <AuthenticatedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/signin" exact component={Landing} props={childProps} />
    <AuthenticatedRoute path="/admin" exact component={Admin} props={childProps} />
    <AuthenticatedRoute path="/forgotpassword" exact component={PasswordForget} props={childProps} />
    <AuthenticatedRoute path="/account" exact component={Account} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    { /* TODO: Build and import a NotFound page and then uncomment the line below*/}
    {/* <Route component={NotFound} /> */}
  </Switch>;

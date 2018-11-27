import React from "react";
import { Switch } from "react-router-dom";

import * as ROUTES from '../routes/names';
import Landing from '../pages/Landing';
import Home from '../pages/Home';
import Account from '../pages/Account';
import Admin from '../pages/Admin';


import { AuthenticatedRoute, UnauthenticatedRoute } from "../hocs/RouteWrappers";

export default ({ childProps }) =>
  <Switch>
    <AuthenticatedRoute path={ROUTES.HOME} exact component={Home} props={childProps} />
    <UnauthenticatedRoute path={ROUTES.LANDING} exact component={Landing} props={childProps} />
    <AuthenticatedRoute path={ROUTES.ADMIN} exact component={Admin} props={childProps} />
    <AuthenticatedRoute path={ROUTES.ACCOUNT} exact component={Account} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    { /* TODO: Build and import a NotFound page and then uncomment the line below*/}
    {/* <Route component={NotFound} /> */}
  </Switch>;

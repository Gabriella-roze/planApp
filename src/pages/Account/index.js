import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../../components/PasswordChange';
import { AuthUserContext, withAuthorization } from '../../hocs/Session';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => authUser != null;

export default withAuthorization(authCondition)(AccountPage);

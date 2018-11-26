import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../../components/PasswordChange';
import { withAuthorization } from '../../hocs/Session';
import { withGlobalState } from '../../hocs/GlobalState';
import { defaultProps } from 'recompose';

const AccountPage = (props) => {
  console.log('props @ AccountPage: ', props);

  return (
    <div>
      <h1>Account: {props.globalState && props.globalState.user && props.globalState.user.email}</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  );
}

const authCondition = authUser => authUser != null;

export default withGlobalState(withAuthorization(authCondition)(AccountPage));

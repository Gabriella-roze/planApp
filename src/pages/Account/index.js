import React from 'react';

import { withGlobalState } from '../../hocs/GlobalState';

import PasswordChangeForm from '../../components/PasswordChange';

const AccountPage = (props) => {
  console.log('props @ AccountPage: ', props);

  return (
    <div>
      <h1>Account: {props.globalState && props.globalState.user && props.globalState.user.email}</h1>
      <PasswordChangeForm />
    </div>
  );
}

export default withGlobalState(AccountPage);

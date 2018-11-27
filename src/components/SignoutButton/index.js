import React from 'react';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';

const signout = (firebase, globalState) => {
  firebase.doSignOut();
  globalState.startLoading();
}

const SignoutButton = (props) => (
  <button type="button" onClick={() => signout(props.firebase, props.globalState)}>
    Sign Out
  </button>
);

export default withGlobalState(withFirebase(SignoutButton));

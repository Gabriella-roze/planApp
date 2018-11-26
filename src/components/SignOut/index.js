import React from 'react';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';

const SignoutEverywere = (firebase, globalState) => {
  firebase.doSignOut();
  globalState.changeUser(null);
}

const SignOutButton = (props) => (
  <button type="button" onClick={() => SignoutEverywere(props.firebase, props.globalState)}>
    Sign Out
  </button>
);

export default withGlobalState(withFirebase(SignOutButton));

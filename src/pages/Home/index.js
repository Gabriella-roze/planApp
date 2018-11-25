import React from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../../hocs/Session';
import { withGlobalState } from '../../hocs/GlobalState';

const HomePage = (props) => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>The Home Page is accessible by every signed in user.</p>
      <p>GlobalState num: {props.state.num}</p>
      <button onClick={() => props.state.changeNum(49)}>Change GlobalState num</button>
    </div>
  );
}

const condition = authUser => authUser != null;

export default compose(
  withAuthorization(condition),
  withGlobalState
)(HomePage);

// This is how would we would write the export without using the { compose } library;
// export default withGlobalState(withAuthorization(condition)(HomePage));
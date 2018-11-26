import React from 'react';
import { compose } from 'recompose';

// import { withAuthorization } from '../../hocs/Session';
import { withGlobalState } from '../../hocs/GlobalState';

const HomePage = (props) => {
  console.log('HOMEPAGE - props: ', props);
  return (
    <div>
      <h1>Home Page - {props.globalState && props.globalState.user && props.globalState.user.name}</h1>
      <p>The Home Page is accessible by every signed in user.</p>
      <p>GlobalState num: {props.globalState.num}</p>
      <button onClick={() => props.globalState.changeNum(49)}>Change GlobalState num</button>
    </div>
  );
}

// const condition = authUser => authUser != null;

export default compose(
  // withAuthorization(condition),
  withGlobalState
)(HomePage);

// This is how would we would write the export without using the { compose } library;
// export default withGlobalState(withAuthorization(condition)(HomePage));
import React from 'react';
import GlobalStateContext from './context';

// This function takes a component...
const withGlobalState = (Component) => {
  // ...and returns another component...
  return (props) => {
    // ... and renders the wrapped component with the context state!
    // Notice that we pass through any additional props as well
    return (
      <GlobalStateContext.Consumer>
        {state => <Component {...props} globalState={state} />}
      </GlobalStateContext.Consumer>
    );
  };
}

export default withGlobalState;

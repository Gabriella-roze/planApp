import React from 'react';

import GlobalStateContext from './context';

class GlobalStateProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      test: 'test from state',
      num: 0,
      num2: 0,
      changeNum: this.changeNum,
    };
  }

  /**
  * METHODS TO CHANGE GLOBAL STATE
  */
  changeNum = num => this.setState({ num });

  render() {
    return (
      <GlobalStateContext.Provider value={this.state}>
        {this.props.children}
      </GlobalStateContext.Provider>
    );
  }
}

export default GlobalStateProvider;


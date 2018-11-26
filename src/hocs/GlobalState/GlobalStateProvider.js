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

      user: null,
      changeUser: this.changeUser
    };
  }

  /**
  * METHODS TO CHANGE GLOBAL STATE
  */
  changeNum = num => this.setState({ num });
  changeUser = user => this.setState({ user });

  render() {
    return (
      <GlobalStateContext.Provider value={this.state}>
        {this.props.children}
      </GlobalStateContext.Provider>
    );
  }
}

export default GlobalStateProvider;


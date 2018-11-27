import React from 'react';

import GlobalStateContext from './context';

class GlobalStateProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      changeUser: this.changeUser,

      num: 0,
      changeNum: (num) => this.setState({ num }),

      isLoading: false,
      stopLoading: this.stopLoading,
      startLoading: this.startLoading
    };
  }

  componentDidMount() {
    console.log('GLOBALSTATEPROVIDER:JS: componentDidMount fired - this.state ', this.state);
  }

  changeUser = (user) => {
    console.log('GLOBALSTATEPROVIDER:JS: changing the user @ globalState with: ', user);
    this.setState({ user });
  }

  startLoading = () => this.setState({ isLoading: true })
  stopLoading = () => this.setState({ isLoading: false })

  render() {
    return (
      <GlobalStateContext.Provider value={this.state}>
        {this.props.children}
      </GlobalStateContext.Provider>
    );
  }
}

export default GlobalStateProvider;


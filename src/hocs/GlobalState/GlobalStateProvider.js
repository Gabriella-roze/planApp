import React from 'react';

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

import GlobalStateContext from './context';

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// };

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


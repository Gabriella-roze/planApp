import React from 'react';

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

import GlobalStateContext from './context';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class GlobalStateProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      test: 'test from state',
      num: 0,
      num2: 0,
      changeNum: this.changeNum,

      isAuthenticated: false,
      authenticate: this.authenticate,
      unauthenticate: this.unauthenticate,

      user: null,
      changeUser: this.changeUser,
      firestoreUserListener: null
    };
  }

  componentDidMount() {
    console.log('GLOBALSTATEPROVIDER:JS: componentDidMount fired - this.state ', this.state);
    // app.initializeApp(config);

    // // Initialize Authentication through Firebase
    // this.auth = app.auth();

    // Initialize Cloud Firestore through Firebase
    this.db = app.firestore();



    // Disable deprecated features of Firestore
    // this.db.settings({ timestampsInSnapshots: true });
  }

  openFirestoreConnection(userUid) {
    console.log('GLOBALSTATEPROVIDER:JS: Opening firestore connection');

    console.log('this.listener: ', this.listener);

    if (this.listener) { return; }

    console.log('Really opening the firestore connection');

    this.listener = this.db.collection("users").doc('3JyUM8A1luXtCZurr080mtnsNqA2').onSnapshot((doc) => {
      console.log('GLOBALSTATEPROVIDER:JS: Updated user from DB');
      const user = doc.data();
      this.changeUser(user);
    });
  }

  closeFirestoreConnection() {
   console.log('GLOBALSTATEPROVIDER:JS: Closing firestore connection');
   console.log('this.listener: ', this.listener);
   if (!this.listener) { return; }
   console.log('Really closing firestore connection');

   this.listener();
   this.setState({ firestoreUserListener: null })
  }

  /**
  * METHODS TO CHANGE GLOBAL STATE
  */
  authenticate = () => this.setState({ isAuthenticated: true });
  unauthenticate = () => this.setState({ isAuthenticated: false });

  changeUser = user => {
    console.log('GLOBALSTATEPROVIDER:JS: changing the user @ globalState with: ', user);
    this.setState({ user });

    // Open/Close the realtime connection with Firestore DB if needed
    if (user) {
      this.openFirestoreConnection(user.uid);
    }
    else {
      this.closeFirestoreConnection();
    }
  }
  

  render() {
    return (
      <GlobalStateContext.Provider value={this.state}>
        {this.props.children}
      </GlobalStateContext.Provider>
    );
  }
}

export default GlobalStateProvider;


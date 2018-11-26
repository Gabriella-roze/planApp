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
      initialize: this.initialize,
      firestoreDb: null,
      firestoreUserListener: null,

      test: 'test from state',
      num: 0,
      num2: 0,
      changeNum: this.changeNum,

      isAuthenticated: false,
      authenticate: this.authenticate,
      unauthenticate: this.unauthenticate,

      user: null,
      changeUser: this.changeUser,

      openFirestoreConnection: this.openFirestoreConnection
    };
  }

  componentDidMount() {
    console.log('GLOBALSTATEPROVIDER:JS: componentDidMount fired - this.state ', this.state);
    // app.initializeApp(config);

    // // Initialize Authentication through Firebase
    // this.auth = app.auth();

    // Initialize Cloud Firestore through Firebase
    const firestoreDb = app.firestore();
    this.setState({ firestoreDb });

    // If authenticated but no user details, fetch user details
    // if (this.state.isAuthenticated && !this.state.user) {

    // }

    // If no connection - open it
    // if (!this.listener) { this.openFirestoreConnection() }



    // Disable deprecated features of Firestore
    // this.db.settings({ timestampsInSnapshots: true });
  }

  openFirestoreConnection = (userUid) => {
    console.log('GLOBALSTATEPROVIDER:JS: Opening firestore connection: ', this.state.firestoreDb);
    if (!userUid) { 
      console.log('Stopping cause no userUid')
      return; 
    }

    if (this.state.firestoreUserListener) {
      console.log('Stopping cause listener already exists');
      return;
    }

    console.log('Really opening the firestore connection: ', userUid, this.state.firestoreDb);

    console.log('firestoreDb: ', this.state.firestoreDb);

    const firestoreUserListener = this.state.firestoreDb.collection("users").doc(userUid).onSnapshot((doc) => {
      console.log('GLOBALSTATEPROVIDER:JS: Updated user from DB');
      const user = doc.data();
      this.changeUser(user);
    });

    this.setState({ firestoreUserListener });
  }

  closeFirestoreConnection = () => {
   console.log('GLOBALSTATEPROVIDER:JS: Closing firestore connection');
   console.log('this.listener: ', this.this.state.firestoreUserListener);
   if (!this.state.firestoreUserListener) { return; }
   console.log('Really closing firestore connection');

   this.this.state.firestoreUserListener();
   this.setState({ firestoreUserListener: null })
  }

  /**
  * METHODS TO CHANGE GLOBAL STATE
  */
  authenticate = () => this.setState({ isAuthenticated: true });
  unauthenticate = () => this.setState({ isAuthenticated: false });

  changeUser = (user) => {
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


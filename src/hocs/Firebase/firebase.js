import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

// import { withGlobalState } from '../GlobalState';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    // Initialize Authentication through Firebase
    this.auth = app.auth();

    // Initialize Cloud Firestore through Firebase
    this.db = app.firestore();

    // Disable deprecated features of Firestore
    this.db.settings({ timestampsInSnapshots: true });
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => { 
    this.auth.signOut();
  };

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** User API ***
  createUser = user => {
    return this.db.collection("users").doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      name: user.name
    });
  }

  getUser = async (userId) => {
    console.log('FIREBASE.JS: getUser fired');

    const docRef = this.db.collection("users").doc(userId);

    // // REALTIME UPDATES
    // this.db.collection("users").doc(userId).onSnapshot(function(doc) {
    //   console.log('FIREBASE.JS: Current user from DB: ', doc.data());
    // });

    try {
      const user = await docRef.get();
    
      if (user.exists) {
        return user.data();
      }
      else {
        return null;
      }
    } catch (error) {
      console.log('error: ', error);
      return null;
    }
  }
}

export default Firebase;


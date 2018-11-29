import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

/**
 * Configuration for firebase. Values are taken from a .env file
 * that is not pushed to Github.
 */
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

console.log('Initializing firebase');

class Firebase {
  constructor() {
    firebase.initializeApp(config);

    // Initialize Authentication through Firebase
    this.auth = firebase.auth();

    // Initialize facebook auth
    this.facebookProvider = new firebase.auth.FacebookAuthProvider();

    // Initialize Cloud Firestore through Firebase
    this.db = firebase.firestore();

    // Disable deprecated features of Firestore
    this.db.settings({ timestampsInSnapshots: true });
  }

  /**
   * Authentication (firebase) methods
   */
  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider)

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  /**
   * Database (firestore) methods
   */
  createUser = user => this.db.collection("users").doc(user.uid).set({ ...user });

  getUser = userId => {
    const docRef = this.db.collection("users").doc(userId);

    return docRef.get();
  }
}

export default Firebase;


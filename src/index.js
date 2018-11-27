import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import App from './App';
import Firebase, { FirebaseContext } from './hocs/Firebase';
import { GlobalStateProvider } from './hocs/GlobalState';

import './index.css';

require('dotenv').config();

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

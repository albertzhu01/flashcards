import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/auth';
import 'firebase/functions';
import { createStore, combineReducers } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

const firebaseConfig = {
  apiKey: "AIzaSyBAnHzvwuqkqJplkJ5ePNfAwSHFvpedQxU",
  authDomain: "bootcamp-65747.firebaseapp.com",
  databaseURL: "https://bootcamp-65747.firebaseio.com",
  projectId: "bootcamp-65747",
  storageBucket: "bootcamp-65747.appspot.com",
  messagingSenderId: "502381618600",
  appId: "1:502381618600:web:467f02125d02358314e99d"
};

firebase.initializeApp(firebaseConfig);
// firebase.functions().useFunctionsEmulator('http://localhost:5001');

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const store = createStore(rootReducer, composeWithDevTools());

// react-redux-firebase config
const rrfConfig = {
  preserveOnLogout: ['homepage'],
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>, 
  document.getElementById('root'),
);

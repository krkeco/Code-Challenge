// index.js

import { AppRegistry } from 'react-native';
import React from 'react';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';

import configureStore from './app/store';

import { createStackNavigator, createAppContainer } from "react-navigation";

import Bookmarks from './app/Bookmarks.js';
import Search from './app/Search.js';
import Places from './app/Places.js';

// var firebase = require("firebase");
//   var config = {
//     apiKey: "AIzaSyAgw31xvREQSTt2u-l_kl7eXOUoScHdNI8",
//     authDomain: "tappsample.firebaseapp.com",
//     databaseURL: "https://tappsample.firebaseio.com",
//     projectId: "tappsample",
//     storageBucket: "tappsample.appspot.com",
//     messagingSenderId: "1054880327903"
//   };
//   firebase.initializeApp(config);

const AppNavigator = createStackNavigator(
 {
    Bookmarks: Bookmarks,
    Search: Search,
    Places: Places
  }
);

let Navigation = createAppContainer(AppNavigator);

const store = configureStore()

const RNRedux = () => (
  <Provider store = { store }>
    <Navigation />
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
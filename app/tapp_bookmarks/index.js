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
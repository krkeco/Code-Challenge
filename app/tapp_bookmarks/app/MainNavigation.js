/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Button, Text, View} from 'react-native';

import { createStackNavigator, createAppContainer } from "react-navigation";

import Bookmarks from './Bookmarks.js';
import Search from './Search.js';
import Places from './Places.js';

type Props = {};


const AppNavigator = createStackNavigator(
 {
    Search: Search,
    Bookmarks: Bookmarks,
    Places: Places
  },
  {
    initialRouteName: "Bookmarks"
  }
);


export default createAppContainer(AppNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

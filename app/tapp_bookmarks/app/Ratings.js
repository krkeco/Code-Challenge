/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Image, Text, View} from 'react-native';

type Props = {};
export default class Ratings extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      // isPinned: false,
      
    };
  }


  render() {
    return (
      <View style={{backgroundColor: '#4000b1', borderRadius: 5, marginRight: 5, width: 30, height: 15}}>
        <View style={{flex:1, flexDirection:'row'}}>
          <Text style={styles.placesSecondaryText}>heart</Text>
          <Text style={styles.placesSecondaryText}>{this.props.rating}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
  placesPrimaryText: {
    fontSize:15,
    color:'#FFFFFF',
    textShadowColor:'#585858',
    textShadowRadius:10,
  },
  placesSecondaryText: {
    fontSize:10,
    color:'#FFFFFF',
    textShadowColor:'#585858',
    textShadowRadius:10,
  },

});
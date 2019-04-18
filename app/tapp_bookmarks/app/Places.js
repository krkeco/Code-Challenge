/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View} from 'react-native';

import { connect } from 'react-redux';
import { addPlace } from './actions/place';



import {API_KEY} from './env.js'


type Props = {};
class Places extends Component<Props> {
  
  static navigationOptions = {
    header: null
  }
  render() {

    let imahe = null;


    let map = 'https://maps.googleapis.com/maps/api/staticmap'
    +'?center='+this.props.currentPlace.lat+','+this.props.currentPlace.lng
    +'&zoom=13&size=600x300'
    +'&maptype=roadmap'
    +'&markers=color:red%7Clabel:C%7C+'+this.props.currentPlace.lat+','+this.props.currentPlace.lng
    +'&key='+API_KEY;

      let photoUri = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='
      +this.props.currentPlace.photoReference
      +'&key='+API_KEY;

      imahe =  <View>
      <Image style={{width:100,height:100}} source={{uri: map}}/>
        <Image style={{width:100,height:100}} source={{uri: photoUri}}/>
      </View>;


    return (
      <View style={styles.container}>
        <View style={{flex:3}}>
        <Image style={{width:'100%',height:'100%'}} source={{uri: photoUri}}/>
        </View>
        <View style={{flex:2}}>

          <Image style={{width:100,height:100}} source={{uri: map}}/>

          <Text style={styles.welcome}>{this.props.currentPlace.name}</Text>
          
          <Text style={styles.welcome}>{this.props.currentPlace.address}</Text>

          <Text style={styles.welcome}>id:  {this.props.currentPlace.id}</Text>
        </View>
      </View>
    );
  }
}

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


const mapStateToProps = state => {
  return {
    places: state.places,
    currentPlace: state.currentPlace
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: (place) => {
      dispatch(addPlace(place))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Places)
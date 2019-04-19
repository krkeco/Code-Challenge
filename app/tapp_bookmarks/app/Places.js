/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Dimensions,ImageBackground, TouchableOpacity, StyleSheet, Image, Text, View} from 'react-native';

import { connect } from 'react-redux';
import { addPlace, removePlace } from './actions/place';


import {getPhotoFromReference, getMapFromLatLng} from './utils.js';

const window = Dimensions.get('window');


type Props = {};
class Places extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isPinned: false,
      
    };
  }

  componentDidMount(){
    this.setState({isPinned: this.props.currentPlace.isPinned})
  }

  togglePin = () => { 
    if(!this.props.currentPlace.isPinned){
      let place = this.props.currentPlace;
      place.isPinned = true;
      this.props.add(this.props.currentPlace)
      this.setState({isPinned: true});
    }else{
      this.props.remove(this.props.currentPlace)
      this.setState({isPinned: false});
    }
  }

  static navigationOptions = {
    header: null
  }



  render() {
    let buttonText = "Pin to Trip";
    let buttonColor = '#4000b1'
    if(this.state.isPinned){
      buttonText = "Pinned to Trip";
      buttonColor = '#00ff31'
    }

    return (
      <View style={styles.container}>
        <ImageBackground 
          source={{uri: getPhotoFromReference(this.props.currentPlace.photoReference)}} 
          style={{flex:3, width: '100%', height: '100%',justifyContent: 'flex-end'}}>
            <Text style={[styles.SecondaryText,styles.left]}>{this.props.currentPlace.locale}</Text>
            <Text style={[styles.PrimaryText,styles.left]}>{this.props.currentPlace.name} - {this.props.currentPlace.rating}</Text>
        </ImageBackground>
          <TouchableOpacity 
            onPress={this.togglePin}
            style={[styles.pinButton,{backgroundColor:buttonColor}]} >
            <Text>{buttonText}</Text>
          </TouchableOpacity>
          <Text style={styles.welcome}>address {this.props.currentPlace.formatted_address}</Text>
        <ImageBackground 
          style={{flex:2, width: '100%', height: '100%'}}  
          source={{uri: getMapFromLatLng(this.props.currentPlace.lat,this.props.currentPlace.lng)}}>

          

          <Text style={styles.welcome}>id:  {this.props.currentPlace.id}</Text>
        
        </ImageBackground>
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
  pinButton: {
    flex: 1,
    justifyContent: 'center',

    width:'90%',
    height: 20,
    margin: 10, 
    borderRadius: 30,
  
  },

  primaryText: {
    fontSize: 24,
    
  },
  secondaryText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
  left: {
    textAlign: 'left',
  },
  middle: {
    textAlign: 'center',
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
    },
    remove: (placeId) => {
      dispatch(removePlace(placeId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Places)
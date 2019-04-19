/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, AsyncStorage, Dimensions,ImageBackground, TouchableOpacity, StyleSheet, Image, Text, View} from 'react-native';

import { connect } from 'react-redux';
import { addPlace, removePlace } from './actions/place';

import {getPhotoFromReference, getMapFromLatLng, storeBookmarks} from './utils.js';

const window = Dimensions.get('window');

const BOOKMARKS = 'bookmarks'

type Props = {};
class Places extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      // isPinned: false,
      
    };
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount(){
    
  }

  togglePin = () => { 

    if(this.isBookmarked(this.props.currentPlace.id)){

      this.props.remove(this.props.currentPlace.id);
      // this.setState({isPinned: false})
    }else{
      this.props.add(this.props.currentPlace);
      // this.setState({isPinned: true})
    }

    
  }


  isBookmarked = (id) => {
    // alert(id)
    if(this.props.places == null ){
      // alert('no props to check, def not bookmarked')
      return false
    }else{
      if(this.props.places.findIndex(place => place.id === id) !== -1){
        // alert('this is a bookmarked place')
        return true
      }else{
        // alert('NOT bookmarked place')
        return false
      }
    }
  }


  render() {
    let buttonText = "Pin to Trip";
    let buttonColor = '#4000b1'
    if(this.isBookmarked(this.props.currentPlace.id)){
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
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Places)
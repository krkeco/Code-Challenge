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
            <Text style={[styles.secondaryText,styles.left]}>{this.props.currentPlace.locale}</Text>

            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={[styles.primaryText,styles.left]}>{this.props.currentPlace.name} </Text>

              <View style={{backgroundColor: 'white', borderRadius: 10, marginRight: 5,marginTop:5, width: 50, height: 25}}>
                <View style={{flex:1, flexDirection:'row'}}>
                  <Image style={{width: 15, height: 15, margin: 5}} source={require('./img/heartBlue.png')}/>
                  <Text style={[styles.placesSecondaryText,{marginTop:2}]}>{this.props.currentPlace.rating}</Text>
                </View>
              </View>
            </View>

        </ImageBackground>

        <TouchableOpacity 
          onPress={this.togglePin}
          style={[styles.pinButton,{backgroundColor:buttonColor}]} >
          <Text style={styles.pinButtonText}>{buttonText}</Text>
        </TouchableOpacity>
       
        <Text style={styles.welcome}>{this.props.currentPlace.formatted_address}</Text>
       
        <Image 
          style={{flex:2, width: '100%', height: '100%'}}  
          source={{uri: getMapFromLatLng(this.props.currentPlace.lat,this.props.currentPlace.lng)}}/>
        
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
    justifyContent: 'center',

    width:'90%',
    height: 50,
    margin: 10, 
    borderRadius: 30,
  
  },
  pinButtonText:{
    fontSize: 16,
    textAlign: 'center',
  },
  primaryText: {
    fontSize: 28,
    color: 'white',
    textShadowColor:'#585858',
    textShadowRadius:10,
    
  },
  secondaryText: {
    fontSize: 16,
    color: 'white',
    textShadowColor:'#585858',
    textShadowRadius:10,
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
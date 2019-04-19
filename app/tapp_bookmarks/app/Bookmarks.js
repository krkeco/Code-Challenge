/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, ImageBackground, Text, TouchableOpacity, FlatList, View} from 'react-native';

import { connect } from 'react-redux';
import { addPlace } from './actions/place';

import {getPhotoFromReference} from './utils.js';


const explorerRef = 'CmRaAAAAV9KxpdXWzTMaruLTL1Hrh82ZQ-50ksuNTTtdwTgiWgJpHHKDQ0WKpjSnZABBJRpJZkEluaLI-U8YdJp_WyuD1otsSafhjFVKlFTrW_kpXjaI2hUyzgj6aWvdcmgXrz1_EhAL-RmXTf3Jn4afw2CAHkDrGhT_ibn5dfC4ThZ6v89u01UWp3L4Cw';

type Props = {};
class Bookmarks extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      time: 'Morning',
      location: '',
    }
  }
  componentDidMount(){
    let d = new Date(); 
    let hours = d.getHours();
    
    if(hours>= 18){
      this.setState({time: 'Evening'});
    }else if (hours  >= 12){
      this.setState({time: 'Afternoon'});
    }


  }
  
  componentWillReceiveProps(){
    this.forceUpdate();
  }

  static navigationOptions = {
    header: null
  }
  render() {
    
    let HUD = 
    <ImageBackground source={require('./img/morning.jpg')} style={[styles.hudContainer,styles.placeImageBG]}>
      
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Text style={[styles.primaryText,styles.left]}>Good {this.state.time}</Text>
        <Text style={[styles.secondaryText,styles.left]}>Today's weather is...</Text>
      </View>

      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => this.props.navigation.push('Search')}>
      <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

    </ImageBackground> ;

    let Places = <View style={styles.emptyPlacesContainer}>
     <View style={{flex: 1,justifyContent: 'flex-start',alignItems: 'center', flexDirection: 'column'}}>
        
      <Text  style={[styles.primaryText,styles.middle]}>This trip is empty</Text>

      <Text style={[styles.secondaryText,styles.middle]}>Click the blue plus to pin a place</Text>
        
      </View>
    
    </View>

    if(this.props.places != null){
        Places = <View style={styles.placesContainer} >
          <FlatList
            horizontal={true}
            data={this.props.places}
            renderItem={({item, index}) => {
            
            let bgImage =getPhotoFromReference(item.photoReference);

                        
              return <TouchableOpacity
                key={item.name}
                style={styles.placesModal}
                onPress={() => this.props.navigation.push('Places')}>
                <ImageBackground source={{uri: bgImage}} style={styles.placeImageBG}>
                  <Text style={styles.placesSecondaryText}>{item.locale}</Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.placesPrimaryText}>{item.name}</Text>
                    <Text style={styles.placesPrimaryText}>{item.rating}</Text>
                    <Text style={styles.placesPrimaryText}>ARROW</Text>

                  </View>
                </ImageBackground>
              </TouchableOpacity>    
              }
          }
          />

        </View>
      }

    let LocationInfo = <ImageBackground source={{uri: getPhotoFromReference(explorerRef)}} style={[styles.placeImageBG,styles.locationInfoContainer]}>
      <Text style={styles.primaryText}>Exploring...</Text>
      <Text style={styles.secondaryText}>location, location</Text>

    </ImageBackground>;

    return (
      <View style={{flex: 1}}>
        
      {HUD}

      {Places}

      {LocationInfo}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  hudContainer: {
    flex: 1,
    padding: 20, 
    paddingTop: 40,


    flexDirection: 'row', 
  },
  emptyPlacesContainer: {
    flex: 5,
    margin: 20, 
    
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
    flexDirection: 'row',
  },

  placesContainer: {
    flex: 5,
    
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
    flexDirection: 'row',
  },
  placesModal:{
    width: 200,
    height: 200,
    marginLeft: 20,
  },
  placeImageBG: {
    width: '100%', 
    height: '100%',
    borderRadius: 10,
  },
  locationInfoContainer:{
    flex: 4,
    justifyContent: 'flex-end',
    padding: 20, 
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
  fabButton: {
    backgroundColor: '#4000b1',
    borderRadius: 30, 
    width: 60, 
    height: 60
  },
  fabText: {
    fontSize: 30, 
    textAlign: 'center', 
    marginTop: 7,
    color: 'white'
  },
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


const mapStateToProps = state => {
  return {
    places: state.places,
    currentPlace: state.currentPlace
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: (name) => {
      dispatch(addPlace(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks)
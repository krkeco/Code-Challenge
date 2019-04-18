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

const API_KEY = 'AIzaSyBHOpLEokznL9Bfd8Zbd6ZD7no-So5ECbE';


type Props = {};
class Bookmarks extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      time: 'Morning',
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

  static navigationOptions = {
    header: null
  }
  render() {

    let HUD = 
    <View style={styles.hudContainer}>
      
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Text style={[styles.primaryText,styles.left]}>Good {this.state.time}</Text>
        <Text style={[styles.secondaryText,styles.left]}>Today's weather is...</Text>
      </View>

      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => this.props.navigation.push('Search')}>
      <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

    </View> ;

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
      let bgImage = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='
      +item.photoReference
      +'&key='+API_KEY

                        
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

    let LocationInfo = <View style={styles.locationInfoContainer}>
      <Text style={styles.primaryText}>Exploring...</Text>
      <Text style={styles.secondaryText}>location, location</Text>

    </View>;

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
    margin: 20, 
    marginTop: 40,

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
    flex: 1,
    margin: 20, 
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
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, AsyncStorage,StyleSheet, ImageBackground,Image, Text, TouchableOpacity, FlatList, View} from 'react-native';

import { connect } from 'react-redux';
import { addPlace, setFromStorage } from './actions/place';
import { setCurrentPlace } from './actions/currentPlace';

import {getPhotoFromReference, firebase} from './utils.js';

const BOOKMARKS = 'bookmarks'
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

  componentWillMount(){
    getFirebaseBookmarks(this.props.add);
  }


  componentDidMount(){
    let d = new Date(); 
    let hours = d.getHours();
    
    if(hours>= 18){
      this.setState({time: 'Evening'});
    }else if (hours  >= 12){
      this.setState({time: 'Afternoon'});
    }
    
    //Originally wasn't sure if I was going to use firebase, but ended up using it.
    // this.getBookmarksFromStorage();

  }


  deleteBookmarks = async () => {

    try {
      await AsyncStorage.setItem(BOOKMARKS, '');
    } catch (error) {
      console.log(error)
    }
  };


  getBookmarksFromStorage = async() => {
    // let Bookmarks = JSON.parse(res);
    try {
    let res = await AsyncStorage.getItem(BOOKMARKS);
    if(res !== null){
        // alert('set bookmarks from storage')
        // alert(res)
        let places = JSON.parse(res);
        // alert(places)
        places.map((place) => {
        this.props.add(place) 
          
        })
      }else{
        //no stored bookmarks
      }
    
    
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }


  static navigationOptions = {
    header: null
  }
  render() {
    
    let HUD = 
    <ImageBackground source={require('./img/morning.jpg')} style={[styles.hudContainer,styles.placeImageBG]}>
      
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Text style={[styles.headerPrimaryText,styles.left]}>Good {this.state.time}</Text>
                            
        <Text style={[styles.headerSecondaryText,styles.left]}>Today's weather is...</Text>
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
              return <TouchableOpacity
                key={item.name}
                style={styles.placesModal}
                onPress={() => {
                  this.props.setCurrentPlace(item);
                  this.props.navigation.push('Places');
                }}>
                <ImageBackground 
                  source={{uri: getPhotoFromReference(item.photoReference)}} 
                  imageStyle={{ borderRadius: 15 }}
                  style={styles.placeImageBG}>


                  <View style={{flex:1, margin: 10, flexDirection:'column', justifyContent: 'flex-end'}}>
                    
                    <View style={{height: 20, flexDirection: 'row'}}>

                      <Text style={[styles.placesSecondaryText,{height:15}]}>{item.locale}</Text>

                        <View style={{backgroundColor: '#4000b1', borderRadius: 5, marginRight: 5, width: 40, height: 15}}>
                          <View style={{flex:1, flexDirection:'row'}}>
                            <Image style={{width: 10, height: 10, margin: 5, marginTop:3}} source={require('./img/heartWhite.png')}/>
                            <Text style={styles.placesSecondaryText}>{item.rating}</Text>
                          </View>
                        </View>

                    </View>

                      <Text style={styles.placesPrimaryText}>{item.name}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>    
              }
          }
          />

        </View>
      }

    let LocationInfo = <ImageBackground source={{uri: getPhotoFromReference(explorerRef)}} style={[styles.placeImageBG,styles.locationInfoContainer]}>
      <Text style={styles.locationPrimaryText}>Exploring...</Text>
      <Text style={styles.locationSecondaryText}>location, location</Text>

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
    marginTop: 5,
  },
  placeImageBG: {
    width: '100%', 
    height: '100%',
  },
  locationInfoContainer:{
    flex: 4,
    justifyContent: 'flex-end',
    padding: 20, 
  },

  headerPrimaryText: {
    fontSize: 28,
    color:'black'
    
  },
  headerSecondaryText: {
    fontSize: 14,
    marginBottom: 5,
    color:'black'
  },
  primaryText: {
    marginTop: 10,
    fontSize: 18,
    color: '#888',
    
  },
  secondaryText: {
    fontSize: 12,
    marginBottom: 5,
    color: '#888',
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
  locationPrimaryText: {
    fontSize:20,
    color:'#FFFFFF',
    textShadowColor:'#585858',
    textShadowRadius:10,
  },
  locationSecondaryText: {
    fontSize:15,
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
    },
    setCurrentPlace: (place) => {
      dispatch(setCurrentPlace(place))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks)
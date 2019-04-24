/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import { addPlace } from './actions/place';
import { setCurrentPlace } from './actions/currentPlace';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { ADD_PLACE } from './actions/types';

import {API_KEY} from './env.js'


type Props = {};
class Search extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      addressQuery: '',
      predictions: [],
      
    };
  }

  static navigationOptions = {
    header: null
  }

  checkValid = (string) => {
    if(string !== undefined && string !== null){
      return string
    }else{
      return 'not available'
    }
  }

  render() {


    return (
      <View style={styles.container}>
        

        
      <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      styles={{
        textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth:0
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: '#555',
          fontSize: 16,
          backgroundColor: '#ddd',
        },
      }}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data, details);

        // alert(JSON.stringify(details.address_components))
        let addressString = ''
        let localeString = ''
        details.address_components.forEach((type) => {
          // address_string += type.long_name + ' ';

          if(type.types.indexOf('route') != -1
          || type.types.indexOf('street_number') != -1
          || type.types.indexOf('sublocality_level_1') != -1
            ){
            if(type.types.indexOf('route') == -1){
              addressString += type.long_name + ', ';
            }else{
              addressString += type.long_name + ' ';
            }
          }
          
          if(type.types.indexOf('sublocality_level_1') != -1
          || type.types.indexOf('administrative_area_level_1') != -1
          || type.types.indexOf('country') != -1
            ){
            localeString += type.long_name;
            if(type.types.indexOf('country') == -1){
              localeString += ', '
            }
          }

        })

        let newPlace = {
            photoReference: details.photos[0].photo_reference ,
            lat: details.geometry.location.lat,
            lng: details.geometry.location.lng,
            formattedAddress: addressString,
            locale: localeString,
            rating: details.rating,
            name: details.name,
            id: details.id,
          };
          this.props.setCurrentPlace(newPlace)
          this.props.navigation.push('Places')
      }}

      getDefaultValue={() => ''}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: API_KEY,
        language: 'en', // language of the results
        types: 'establishment' // default: 'geocode'
      }}


      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        type: 'cafe'
      }}
      
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: ['photo','id']
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      renderLeftButton={null}
      renderRightButton={() => 
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Text style={{fontSize: 16, margin: 16, color: '#1faadb'}}>Cancel</Text>
        </TouchableOpacity>}
    />

       
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12,
    paddingTop: 45
  },
  button: {
    backgroundColor: '#263238',
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: 'white'
  },
  inputLauncher: {
    backgroundColor: '#F3F7F9',
    width: '100%',
    borderRadius: 4,
    height: 35,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 16
  },
  inputWrapper: {
    backgroundColor: '#F3F7F9',
    width: '100%',
    borderRadius: 2,
    justifyContent: 'center',
    paddingHorizontal: 8
  },
  input: {
    color: '#222B2F',
    height: 35,
    fontSize: 15,
    paddingVertical: 4
  },
  list: {
    marginTop: 16,
    height: Dimensions.get('window').height - 70
  },
  listItemWrapper: {
    backgroundColor: 'transparent',
    height: 56
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%'
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DAE4E9',
    width: '92%',
    marginHorizontal: 16,
    opacity: 0.6
  },
  primaryText: {
    color: '#222B2F',
    fontSize: 15,
    marginBottom: 3
  },
  placeMeta: {
    flex: 1,
    marginLeft: 15
  },
  secondaryText: {
    color: '#9BABB4',
    fontSize: 13,
  },
  listIcon: {
    width: 25,
    height: 25
  },
  textInputContainer: {
    width: '100%'
  },
  description: {
    fontWeight: 'bold'
  },
  predefinedPlacesDescription: {
    color: '#1faadb'
  },

  map: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1
  }
});



const mapStateToProps = state => {
  return {
    places: state.places,
    currentPlaceId: state.currentPlaceId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: (place) => {
      dispatch(addPlace(place))
    },
    setCurrentPlace: (place) => {
      dispatch(setCurrentPlace(place))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
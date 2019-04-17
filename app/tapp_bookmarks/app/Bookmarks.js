/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {};
export default class Bookmarks extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      places: [
        // {name: 'KFC'},
        // {name: 'MacDannies'},

      ],
    }
  }
  render() {

    let HUD = 
    <View style={styles.hudContainer}>
      
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Text style={[styles.primaryText,styles.left]}>Good Day ...</Text>
        <Text style={[styles.secondaryText,styles.left]}>Today's weather is...</Text>
      </View>

      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => this.props.navigation.push('Search')}>
      <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

    </View> ;

    let Places = <View style={styles.placesContainer}>
     <View style={{flex: 1,justifyContent: 'flex-start',alignItems: 'center', flexDirection: 'column'}}>
        
      <Text  style={[styles.primaryText,styles.middle]}>This trip is empty</Text>

      <Text style={[styles.secondaryText,styles.middle]}>Click the blue plus to pin a place</Text>
        
      </View>
    
    </View>

    if(this.state.places.length != 0){
        Places = <View>
          {this.state.places.map((place,index) => {
            return <View key={index}>
            <Text>{place.name}</Text>
            <Button
              title="Place"
              onPress={() => this.props.navigation.push('Places')}
            />    
            </View>
          })
          }
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

    flexDirection: 'row', 
  },
  placesContainer: {
    flex: 5,
    margin: 20, 
    
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
    flexDirection: 'row',
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
});

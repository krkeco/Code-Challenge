import React from 'react';
import {AsyncStorage} from 'react-native';


var firebase = require("firebase");
  var config = {
    apiKey: "AIzaSyAgw31xvREQSTt2u-l_kl7eXOUoScHdNI8",
    authDomain: "tappsample.firebaseapp.com",
    databaseURL: "https://tappsample.firebaseio.com",
    projectId: "tappsample",
    storageBucket: "tappsample.appspot.com",
    messagingSenderId: "1054880327903"
  };
  firebase.initializeApp(config);


const BOOKMARKS = 'bookmarks'

import {API_KEY} from './env.js'

export const getPhotoFromReference = (reference) => {
    return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200'
+'&photoreference='+ reference
+'&key=' +API_KEY;
}

export const getMapFromLatLng = (lat,lng) => {
	return 'https://maps.googleapis.com/maps/api/staticmap'
    +'?center='+lat+','+lng
    +'&zoom=13&size=600x300'
    +'&maptype=roadmap'
    +'&markers=color:red%7Clabel:C%7C+'+lat+','+lng
    +'&key='+API_KEY;
}
export default getFirebaseBookmarks = (addPlace) => {
    firebase.database().ref('Bookmarks/userID').once('value', function (snapshot) {
        let res = JSON.stringify(snapshot.val());
        
        let places = JSON.parse(res);

        let keys = Object.keys(places)
        
        keys.forEach( (key) => {
          place = places[key].place
        
          addPlace(place)
        })

    });
}

export const storeBookmarks = async (places) => {
    let savedPlaces = [];
    if(places !== null){
      places.map((place) => {
        savedPlaces.push(place);

        firebase.database().ref('Bookmarks/'+'userID/'+place.id).set({
            place
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })

      })

    }
    try {
      await AsyncStorage.setItem(BOOKMARKS, JSON.stringify(savedPlaces));


    } catch (error) {
      console.log(error)
      
    }
  };
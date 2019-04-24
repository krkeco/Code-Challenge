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

const sampleData = {
  "Bookmarks" : {
    "userID" : {
      "cd19917c424f24ca3c8fafd1cfecf47833070147" : {
        "place" : {
          "formattedAddress" : "422 E 2nd St, Los Angeles, CA 90012, USA",
          "id" : "cd19917c424f24ca3c8fafd1cfecf47833070147",
          "lat" : 34.046784,
          "lng" : -118.2387562,
          "locale" : "Los Angeles County, ",
          "name" : "Sushi Gen",
          "photoReference" : "CmRaAAAAppPxcR8vm_oijBJXP6afj1nncchWuUej5RTj88BBQml-v9q-X71DPkW_nGCkE2DqiqF1G2vfZTscmIWVvC5ojK7dAUk-AK9tMy8NaV2dN8Nz-67BNDbdGn7fHpAtbvF5EhBKgVqA4zlCWwmpvWiY9xKRGhRQEbwJLD2uUvu9itoRVEgW4cUHgA",
          "rating" : 4.6
        }
      },
      "d38626f49d729d5d739d31096be728811dc29348" : {
        "place" : {
          "formattedAddress" : "722 N Azusa Ave, Azusa, CA 91702, USA",
          "id" : "d38626f49d729d5d739d31096be728811dc29348",
          "lat" : 34.1345429,
          "lng" : -117.9072773,
          "locale" : "California, ",
          "name" : "Sushi Sawa",
          "photoReference" : "CmRaAAAATToBK4XEsmhUhAtzDPppvRsAlCJfOfPnXLsSimNfq52aMZ6ksJPIoOw6-ioGSGxY13nkt_QX1QchPHDwoCOpHTOfz9flrCrChwL0jiSLSO_vXXC9FO2skwQMfTBi9iM0EhAi4d3wV3BrsPjyKnd_coZ6GhQg00lsTujbsXWm8RcxVwtx5MA2cw",
          "rating" : 4.7
        }
      }
    }
  }
}


export default getFirebaseBookmarks = (addPlace) => {
    firebase.database().ref('Bookmarks/userID').once('value', function (snapshot) {
        let res = JSON.stringify(snapshot.val());
        // alert(places)
        let places = JSON.parse(res);

        let keys = Object.keys(places)
        
        keys.forEach( (key) => {
          place = places[key].place
          // alert(place.name)
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
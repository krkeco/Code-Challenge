#Bookmarks App

##Install

-Make sure you have NPM, React-Native, and Nodejs installed and up-to-date

-clone this repository

-cd Code-Challenge/app/tapp_bookmarks

-npm install


-touch ./app/.env.js
--add 'API_KEY=[your_google_api_key]'

-Android Only:
--add local.properties file with sdk information
---example: 'sdk.dir=/root/Android/Sdk'

-react-native run-[android/ios]

###Met the following Requirements::

- iOS App written in React Native - 3rd Party or Native Modules allowed
- Responsive Layouts (iPhone 6 or newer)
- Use of [Google Maps Platform](https://developers.google.com/maps/documentation/) (place autocomplete, place detail, place photo)

- **Bookmarks Screen**
  - Show carousel of bookmarked places, if any
  - Allow user to search and add additional places to bookmarks
  - Weather and other non-bookmark information can be mocked
- **Search Screen**
  - Show results from Google Places Autocomplete as user types in search field
- **Place Screen**
  - Use Google Place Details to retrieve all relevant data, such as name, address, rating, and etc
  - Use Google Place Photo to show a photo from place
  - Use Google Place Static Maps to show a image of location on map
  - Correct ‘Bookmark’ button depending on if place is bookmarked


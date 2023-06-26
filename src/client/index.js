import { newTrip, addTrip, removeTrip, TripArray } from './js/app'
import { daysCalculator, daysToMils } from './js/daysCalculator'
import { getGeoname, getWeather, getPixabay } from './js/apiHandler'
// import { getWeather } from './js/test'
import { renderDestSelect, toggleCard, toggleForm, destSelect, loadingText, loadingOn, loadingOff } from './js/dynamicUI'
import { Trip } from './js/tripClassHandler'

import './styles/styles.scss'


let data = {
    lat: 33.8688,
    lon: 151.2093,
    prov: "New South Wales",
    country: "Australia"
}

console.log(data)

getWeather(data)

getGeoname('melbourne')


/*

// ------- DONE --------- //

    - collect input
    - process input 
    - geonames api call
    - process response
    - pixabay api call
    - process response 
    - basic structure scss
    - Dynamic UI
        - toggle form
    - Trip Card
        - countdown
        - visible image
    - weatherbit api call
    - process weatherbit response


// ------- TO DO ---------- //
        
    - validate input 
        - must enter date
        - date must be after the current date
    - user must 'save' trip to add to array
        - inital trip has option to print too
    - Trip Card
        - option to edit
        - option to remove
        - show weather data (process every 12 hours?)
            - if trip > 16 days away, just show current weather
            - if trip <= 16 days away, show (available) weather per day of trip        
        - option to print data
        - option to add itinerary
        - option to add packing list
    - Sort saved trips by countdown
    - finish design 

*/

export { 
    daysCalculator, 
    newTrip, 
    getGeoname, 
    renderDestSelect, 
    getWeather, 
    getPixabay, 
    daysToMils,
    Trip,
    toggleCard,
    toggleForm,
    destSelect,
    addTrip,
    removeTrip,
    loadingOn,
    loadingOff,
    loadingText,
    TripArray
}
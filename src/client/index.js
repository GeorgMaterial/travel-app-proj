import { newTrip, addTrip, removeTrip, TripArray } from './js/app'
import { daysCalculator, daysToMils } from './js/daysCalculator'
import { getGeoname, getWeather, getPixabay } from './js/apiHandler'
import { renderDestSelect, toggleCard, toggleForm, destSelect, loadingText, loadingOn, loadingOff } from './js/dynamicUI'
import { Trip } from './js/tripClassHandler'

import './styles/styles.scss'

// let asyncFunc = async (func) => {
//     let coord = await func

//     try {
//         let data = await coord
//         console.log(data, 'asyncFunc')
//         return data
//     } catch ( error ){
//         console.log(error, 'asyncFunc error')
//     }
// }


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
            - process weatherbit response
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
import { newTrip, addTrip, removeTrip, TripArray } from './js/app'
import { daysCalculator, daysToMils } from './js/daysCalculator'
import { getGeoname, getWeather, getPixabay } from './js/apiHandler'
import { renderDestSelect, capitalizeFirstLetter, loadingText, loadingOn, loadingOff, generalToggle } from './js/dynamicUI'
import { Trip } from './js/tripClassHandler'

import './styles/styles.scss'

const form = document.getElementById('form')

form.addEventListener('submit', e => {
    e.preventDefault()
    newTrip()
})

/*// ------- DONE --------- //

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
        - option to remove
    - weatherbit api call
    - process weatherbit response
    - show weather data (process every 12 hours?)
        - if trip > 16 days away, just show current weather
        - if trip <= 16 days away, show (available) weather per day of trip  
    - toggle weather button functionality
    - validate input 
        - must enter date
        - date must be after the current date
    


// ------- TO DO ---------- //
    - finish design 
    - active/inactive states
    - initial state => "no trips, add one?"
    - confirm remove trip
    - bug check weather date thing ??
*/

export { 
    daysCalculator,
    capitalizeFirstLetter,
    newTrip, 
    getGeoname, 
    renderDestSelect, 
    getWeather, 
    getPixabay, 
    daysToMils,
    Trip,
    addTrip,
    removeTrip,
    loadingOn,
    loadingOff,
    loadingText,
    TripArray,
    generalToggle
}
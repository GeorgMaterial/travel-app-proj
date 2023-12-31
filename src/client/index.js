import { newTrip, addTrip, removeTrip, TripArray } from './js/app'
import { daysCalculator, daysToMils } from './js/daysCalculator'
import { getGeoname, getWeather, getPixabay } from './js/apiHandler'
import { renderDestSelect, capitalizeFirstLetter, loadingText, loadingOn, loadingOff, generalToggle } from './js/dynamicUI'
import { Trip } from './js/tripClassHandler'

import './styles/styles.scss'

const form = document.getElementById('form')



const date_defaults = _ => {
    const start = document.getElementById('new_arrive')
    const end = document.getElementById('new_return')

    let now = new Date()
    let then = new Date(now.getTime() + (1000*60*60*24))

    const months = ["01","02","03","04","05","06","07","08","09","10","11","12"]
    
    const now_day = now.getDate() > 9 ? now.getDate() : `0${now.getDate()}`
    const then_day = then.getDate() > 9 ? then.getDate() : `0${then.getDate()}`

    start.value = `${now.getFullYear()}-${months[now.getMonth()]}-${now_day}`
    end.value = `${then.getFullYear()}-${months[then.getMonth()]}-${then_day}`
    start.setAttribute('min',now.toDateString())
    end.setAttribute('min',then)
}

document.addEventListener('DOMContentLoaded', date_defaults())
            
form.addEventListener('submit', e => {
    e.preventDefault()
    newTrip()
    date_defaults()
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
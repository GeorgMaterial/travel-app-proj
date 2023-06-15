import { newTrip } from './js/app'
import { daysCalculator } from './js/daysCalculator'
import { reqHandler, getWeather } from './js/apiHandler'
import { renderDestSelect } from './js/dynamicUI'

import './styles/styles.scss'

let asyncFunc = async (func) => {
    let coord = await func

    try {
        let data = await coord
        console.log(data, 'asyncFunc')
        return data
    } catch ( error ){
        console.log(error, 'asyncFunc error')
    }
}

// ------ CREATE NEW TRIP ----- //
// step one - collect input from user -- CREATE TRIP
// visible loading/processing dialogue
// process input
// make request to Geonames API for dest coordinates
// recieve coordinates
// make request to Weatherbit API for forecast USING coordinates
// make request to pixabay for image of destination
// process responses 
// display data 
// save data in local storage ???


// -------- EDIT TRIP -------- //
// option to print / export as PDF
// option for additional trips
    // sort by countdown
    // move & reformat expired trips
// option for to-do list & packing list 
// option to delete/remove trips

export { daysCalculator, newTrip, reqHandler, renderDestSelect, getWeather, asyncFunc }
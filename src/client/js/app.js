// CREATE FUNCTIONS THAT CAN BE USED MORE THAN ONCE !!!!!!
const dest_select = document.getElementById('dest_select')
const form = document.getElementById('form')
const form_toggle = document.getElementById('form-toggle')
const exp_trip = document.querySelectorAll('.exp-trip')
const TripArray = []

function newTrip(e){
    e.preventDefault()
    const form = e.srcElement.form
    
    // ------ CREATE NEW TRIP ----- //
    // step one - collect input from user -- CREATE TRIP
    const tripData = {
        city : document.getElementById('new_city').value,
        // country : document.getElementById('new_cntry').value,
        arrival : new Date(document.getElementById('new_arrive').value),
        depart : new Date(document.getElementById('new_return').value)
    }

    client.getGeoname(tripData.city)

    document.addEventListener('selectorInit', e => {
        let array = e.detail.array
        const options = document.getElementsByClassName('dest_opt')
        for (let li of options){
            li.addEventListener('click',() => {
                let item = array[li.id]
                tripData.lat = item.lat
                tripData.lon = item.lon
                tripData.prov = item.prov,
                tripData.country = item.country
                tripData.id = TripArray.length

                const trip = new client.Trip(tripData)
                TripArray.push(trip)
                dest_select.removeAttribute('active','')
            })
        }
    })  
}

document.addEventListener('pixabayInit', e => {
    let index = e.detail.id
    TripArray[index].image_url = e.detail.url
    TripArray[index].fillCard()
})

form_toggle.addEventListener('click', o => {
    form.toggleAttribute('active')
})

for (let element of exp_trip){
    console.log(element)
    element.addEventListener('click', e => {
        let item = element.nextElementSibling
        item.toggleAttribute('active')
    })
}

// make request to pixabay for image of destination
    // process responses 
    // display data 
    // save data in local storage ???

// make request to Weatherbit API for forecast USING coordinates
// ---- ADD CONDITIONAL => IS TRIP WITHIHN 16 DAYS ---- //
// client.getWeather(array[li.id])
// document.addEventListener('weatherReceived', e => {
//     let response = e.detail.response // WEATHER DATA FOR SELECTED LOCATION
// })



    

    // process input
    
    // form.reset()
    // visible loading/processing dialogue

    // make request to Geonames API for dest coordinates
    

export { newTrip }
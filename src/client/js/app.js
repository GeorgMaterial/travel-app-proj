// CREATE FUNCTIONS THAT CAN BE USED MORE THAN ONCE !!!!!!
const form = document.getElementById('form')
const form_toggle = document.getElementById('form-toggle')
const exp_trip = document.querySelectorAll('.exp-trip') //EXPAND BUTTON ON CARD
const Trip_Array = []

function newTrip(e){
    e.preventDefault()
// ------ CREATE NEW TRIP ----- //
// step one - collect input from user -- CREATE TRIP

    const city = document.getElementById('new_city').value

    const tripData = {
        city : city,
        arrival : new Date(document.getElementById('new_arrive').value),
        depart : new Date(document.getElementById('new_return').value)
    }
    console.log(city)
    client.loadingOn()
    client.loadingText('Asking the internet about your destination...')
    client.toggleForm('off')
    client.getGeoname(tripData.city)
    .then(async (data) => {
        let array = await client.renderDestSelect(data)
        return array
    })
    .then((array) => {
        client.destSelect(array, tripData)
    })

    
}


form_toggle.addEventListener('click', o => {
    client.toggleForm('active')
})

function addTrip(trip){
    Trip_Array.push(trip)
}

function removeTrip(trip){
    let index = TripArray.indexOf(trip)
    Trip_Array.splice(index,1)
}

function TripArray(){
    return Trip_Array
}

export { 
    newTrip,
    addTrip,
    removeTrip,
    TripArray
}
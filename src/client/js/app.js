// CREATE FUNCTIONS THAT CAN BE USED MORE THAN ONCE !!!!!!
const form = document.getElementById('form')
const form_toggle = document.getElementById('form-toggle')
const exp_trip = document.querySelectorAll('.exp-trip') //EXPAND BUTTON ON CARD
const Trip_Array = []

function newTrip(e){
    e.preventDefault()
// ------ CREATE NEW TRIP ----- //
// step one - collect input from user -- CREATE TRIP
    const tripData = {
        city : document.getElementById('new_city').value,
        arrival : new Date(document.getElementById('new_arrive').value),
        depart : new Date(document.getElementById('new_return').value)
    }

    
    client.loadingOn()
    client.loadingText('Asking the internet about your destination...')
    client.toggleForm('off')
    client.getGeoname(tripData.city)

    document.addEventListener('selectorInit', e => {
        client.destSelect(e, tripData)
    })  
}


document.addEventListener('pixabayInit', e => {
    // WHEN PIXABAY RESP RECEIVED, ADD IMG URL TO TRIP OBJECT & RENDER TRIP CARD
    let index = e.detail.id
    Trip_Array[index].image_url = e.detail.url
    Trip_Array[index].fillCard()
    Trip_Array[index].forcast()
})

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
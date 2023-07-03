// CREATE FUNCTIONS THAT CAN BE USED MORE THAN ONCE !!!!!!

const Trip_Array = []

function newTrip(){
    // ------ CREATE NEW TRIP ----- //
    // step one - collect input from user -- CREATE TRIP
    const form = document.getElementById('form')
    const city = document.getElementById('new_city').value

    const tripData = {
        city : city,
        arrival : new Date(document.getElementById('new_arrive').value),
        depart : new Date(document.getElementById('new_return').value)
    }
    client.loadingOn()
    client.loadingText('Asking the internet about your destination...')
    form.removeAttribute('active','')
    client.getGeoname(tripData.city)
    .then(async (data) => {
        let array = await client.renderDestSelect(data)
        return array
    })
    .then((array) => {
        const container = document.getElementById('dest_select')
        const options = document.getElementsByClassName('dest_opt')
        for (let li of options){
        li.addEventListener('click',() => {
            let item = array[li.id]
            tripData.lat = item.lat
            tripData.lon = item.lon
            tripData.prov = item.prov,
            tripData.country = item.country
            tripData.id = TripArray().length

            const trip = new client.Trip(tripData)
            Trip_Array.push(trip)
            container.removeAttribute('active','')
        })
    }
    })
}




function addTrip(trip){
    Trip_Array.push(trip)
    return Trip_Array
}

function removeTrip(e){
    if (window.confirm('Are you sure you want to remove this trip?')){
        let bits = e.split('-')
        Trip_Array[bits[1]].clearTimers()
        let card = document.querySelector(`#${e}`)
        card.remove()
    }
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
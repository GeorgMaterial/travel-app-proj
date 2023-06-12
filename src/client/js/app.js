// CREATE FUNCTIONS THAT CAN BE USED MORE THAN ONCE !!!!!!
function newTrip(e){
    e.preventDefault()

    const form = e.srcElement.form
    
    // ------ CREATE NEW TRIP ----- //
    // step one - collect input from user -- CREATE TRIP
    const dest = document.getElementById('new_dest').value
    const arrival = new Date(document.getElementById('new_arrive').value)
    const depart = new Date(document.getElementById('new_return').value)

    console.log(dest, arrival, depart)

    const trip_length = client.daysCalculator(arrival, depart)

    // process input
    
    // form.reset()
    // visible loading/processing dialogue

    

    // make request to Geonames API for dest coordinates
    // recieve coordinates
    // make request to Weatherbit API for forecast USING coordinates
    // make request to pixabay for image of destination
    // process responses 
    // display data 
    // save data in local storage ???

}



export { newTrip }
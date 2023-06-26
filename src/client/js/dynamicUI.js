function renderDestSelect(data){
    
    const container = document.getElementById('dest_select')
    let optionList = document.getElementById('option-list');
    const objArray = []

    optionList.replaceChildren()

    for (let item of data){
        let optDiv = document.createElement('li'); //CREATE LIST ITEM PER OPTION
        optDiv.className = 'dest_opt' //class per list item
        optDiv.id = objArray.length //assign id to list item that corresponds to index in data array
        optDiv.innerHTML = 
            `${item.name}, ${item.adminName1}, ${item.countryName}`

        optionList.appendChild(optDiv) // appends list item to the ul

        objArray.push({
            "lat": item.lat, 
            "lon": item.lng,
            "prov": item.adminName1,
            "country": item.countryName 
        }) 
    }
    // container.appendChild(optionList)
    client.loadingOff()
    container.setAttribute('active','')
    document.getElementById('form').reset()
    return objArray
 

}

function destSelect(array, tripData){
    console.log(array)
    const container = document.getElementById('dest_select')
    const options = document.getElementsByClassName('dest_opt')
    for (let li of options){
        li.addEventListener('click',() => {
            let item = array[li.id]
            tripData.lat = item.lat
            tripData.lon = item.lon
            tripData.prov = item.prov,
            tripData.country = item.country
            tripData.id = client.TripArray().length

            const trip = new client.Trip(tripData)
            client.addTrip(trip)
            container.removeAttribute('active','')
        })
    }
}


function toggleCard(e){
    let item = e.target.previousElementSibling
    item.toggleAttribute('active')
}

function toggleForm(mode){
    let form = document.getElementById('form')
    form.hasAttribute('active') ? (
        mode == 'active' ? console.log('already active') 
            : form.removeAttribute('active')
    ) : (
        mode == 'active' ? form.setAttribute('active','')
            : console.log('already inactive')
    )

}

function loadingOn(){
    const loader = document.getElementById('loader')
    loader.style.display = "block"
}

function loadingText(string=""){
    const cont = document.getElementById('loading-text')
    cont.innerText = string
}

function loadingOff(){
    const loader = document.getElementById('loader')
    const text = document.getElementById('loading-text')
    loader.style.display = "none"
    text.innerText = ''
}

export { 
    renderDestSelect,
    toggleCard,
    toggleForm,
    loadingOn,
    loadingOff,
    loadingText,
    destSelect
}
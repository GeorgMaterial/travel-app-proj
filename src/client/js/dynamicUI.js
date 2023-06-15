function renderDestSelect(data){
    const container = document.getElementById('dest_select')
    let optionList = document.createElement('ul');
    const objArray = []

    for (let item of data){
        let optDiv = document.createElement('li');
        optDiv.className = 'dest_opt'
        optDiv.id = objArray.length
        optDiv.innerHTML = 
            `${item.name}, ${item.adminCode1}, ${item.countryName}`

        optionList.appendChild(optDiv)

        objArray.push({
            "name": item.name,
            "lat": item.lat, 
            "lon": item.lng,
            "prov": item.adminCode1,
            "country": item.countryName 
        })
    }

    container.appendChild(optionList)
    container.style.display = 'block'

    return objArray

}

function locationSelector(data){
    
    const id_coord = renderDestSelect(data)

    const options = document.getElementsByClassName('dest_opt')
    for (let li of options){
        li.addEventListener('click',() => {
            client.getWeather(id_coord[li.id])
        })
    }

}

export { renderDestSelect }
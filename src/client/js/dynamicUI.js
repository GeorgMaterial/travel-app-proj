function renderDestSelect(data){
    const container = document.getElementById('dest_select')
    let optionList = document.createElement('ul');
    const objArray = []

    console.log(data,'render')

    for (let item of data){
        let optDiv = document.createElement('li');
        optDiv.className = 'dest_opt'
        optDiv.id = objArray.length
        optDiv.innerHTML = 
            `${item.name}, ${item.adminName1}, ${item.countryName}`

        optionList.appendChild(optDiv)

        objArray.push({
            "lat": item.lat, 
            "lon": item.lng,
            "prov": item.adminName1,
            "country": item.countryName 
        })
    }

    container.appendChild(optionList)
    container.setAttribute('active','')

    return objArray

}

function toggleCard(e){
    let item = e.target.nextElementSibling
    item.toggleAttribute('active')
}

function toggleForm(mode){
    let form = document.getElementById('form')
    form.hasAttribute('active') ? (
        mode == 'active' ? console.log('already active') 
            : form.removeAttribute('active')
    ) : (
        mode == 'active' ? form.setAttribute('active',)
            : console.log('already inactive')
    )

}

export { 
    renderDestSelect,
    toggleCard,
    toggleForm  
}
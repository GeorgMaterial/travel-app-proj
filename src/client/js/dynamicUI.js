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
    
    client.loadingOff()
    container.setAttribute('active','')
    document.getElementById('form').reset()
    return objArray
 

}

function capitalizeFirstLetter(phrase){
    const array = []

    let words = phrase.split(' ')

    for (let word of words){
        let letter = word.charAt(0).toUpperCase()
        let remainder = word.slice(1)
        
        array.push(letter+remainder)
    }

    const newPhrase = array.join(' ')
    return newPhrase
}

function generalToggle(e, id){
    if (e.target != null){
        let item = e.target
        item.toggleAttribute('active')
    }
    let el = document.getElementById(`${id}`)
    el.toggleAttribute('active')
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
    capitalizeFirstLetter,
    renderDestSelect,
    loadingOn,
    loadingOff,
    loadingText,
    generalToggle
}
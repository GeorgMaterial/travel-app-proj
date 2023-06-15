function reqHandler(city){
    getKey('geonames')

    .then((res) => {
        let query = 
            `${res.baseURL}username=${res.key}&q=${city}&isNameRequired=true&maxRows=10&featureClass=P`
        return query
    })
    .then((query) => apiGET(query))
    .then((data) => {
        let array = data.geonames
        return array 
    })
    // .then((data) => client.locationSelector(data))
    .then((obj) => client.renderDestSelect(obj))
    .then((array) => {
        const selectorInit = new CustomEvent('selectorInit',{
            detail: {
                array: array
            }
        })

        document.dispatchEvent(selectorInit)
    })
}



const getKey = async api => { 

    let req = await fetch(`http://localhost:8000/key?api=${api}`)

    try {
        const res = await req.json()
        return res 
    } catch ( error ){
        console.log(error, 'getKey error')
    }
}

function getWeather(data = {
    name: "Sydney",
    lat: 0.1,
    lon: 0.2,
    prov: "NSW",
    country: "Australia"
}){
    getKey('weatherbit')

    .then((res) => {
        let query = 
            `${res.baseURL}lat=${data.lat}&lon=${data.lon}&key=${res.key}`
        return query
    })
    .then((query) => apiGET(query))
    .then((res) => {
        const weatherReceived = new CustomEvent('weatherReceived',{
            detail: {
                response: res
            }
        })

        document.dispatchEvent(weatherReceived)
        
    })
}

async function apiGET(query){
    let req = await fetch(query)

    try {
        const res = await req.json()
        return res
    } catch ( error ){
        console.log(error, 'apiGET error')
    }
}

export { reqHandler, getWeather }
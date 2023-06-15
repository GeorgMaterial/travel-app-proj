function getGeoname(city){
    getKey('geonames')

    .then((res) => {
        let query = queryInit({q: city}, res)

        apiGET(query)
        .then((data) => {
            // console.log(data)
            
            return data.geonames 
        })
        .then((arr) => client.renderDestSelect(arr))
        .then((array) => {
            const selectorInit = new CustomEvent('selectorInit',{
                detail: {
                    array: array
                }
            })
            document.dispatchEvent(selectorInit)
        })
    })
    
}

const getKey = async api => { 

    let req = await fetch(`http://localhost:8000/key?api=${api}`)

    try {
        const res = await req.json()
        return res.baseURL 
    } catch ( error ){
        console.log(error, 'getKey error')
    }
}

function getWeather(data){

    getKey('weatherbit')
    .then((res) => queryInit(data,res))
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

function queryInit(data = {}, res){
    const array = []

    for (let [key,val] of Object.entries(data)){
        let str = `${key}=${val}`
        array.push(str)
    }

    let query = array.join('&')
    console.log(query)
    return res.concat(query)
}

function getPixabay(data, id){
    let query = data.replaceAll(' ','_')
    console.log(query)
    getKey('pixabay')

    .then((res) => queryInit({q:query}, res))
    .then((q) => apiGET(q))
    .then((item) => {
        const pixabayInit = new CustomEvent('pixabayInit',{
            detail: {
                id: id,
                url: item.hits[0].webformatURL
            }
        })
        document.dispatchEvent(pixabayInit)
    })
}


export { getGeoname, getWeather, getPixabay }
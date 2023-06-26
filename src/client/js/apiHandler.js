
<<<<<<< Updated upstream
    .then((res) => {
        let query = queryInit({q: city}, res)

        apiGET(query)
        .then((data) => {
            // console.log(data)
            client.loadingText('Writing down the answer...')
            return data.geonames 
        })
        .then((arr) => client.renderDestSelect(arr))
        // .then((array) => {
        //     const selectorInit = new CustomEvent('selectorInit',{
        //         detail: {
        //             array: array
        //         }
        //     })
        //     document.dispatchEvent(selectorInit)
        // })
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

function getWeather(data, id){

    getKey('weatherbit')
    .then((res) => queryInit(data,res))
    .then((query) => apiGET(query))
    .then((res) => {
        const weatherReceived = new CustomEvent('weatherReceived',{
            detail: {
                response: res
            }
        })
        client.TripArray()[id].showForecast(res)

        // client.TripArray()[id].dispatchEvent(weatherReceived)
        
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
=======
async function getData(data,type){
    let query = queryInit(data)
    console.log('getData query', query)
    let request = await fetch(`http://localhost:8000/${type}?${query}`)

    try {
        let res = await request.json()
        return res
    } catch(error ){
        console.log(error)
    }
}



function queryInit(data = {}){
    let query = []
>>>>>>> Stashed changes

    for (let [key,val] of Object.entries(data)){
        let str = `${key}=${val}`
        query.push(str)
    }

<<<<<<< Updated upstream
    let query = array.join('&')
    console.log(query)
    return res.concat(query)
=======
    query = query.join('&')
    console.log("queryInit", query)
    return query
>>>>>>> Stashed changes
}


export { getData }
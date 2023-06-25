function getGeoname(city){
    getKey('geonames')

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

async function getWeather(data){
    let query = queryInit(data)
    let request = await fetch(`http://localhost:8000/weather?${query}`)

    try {
        let res = await request.json()
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }
}

// function getWeather(data, id){

//     getKey('weatherbit')
//     .then((res) => queryInit(data,res))
//     .then((query) => apiGET(query))
//     .then((res) => {
//         // const weatherReceived = new CustomEvent('weatherReceived',{
//         //     detail: {
//         //         response: res
//         //     }
//         // })
//         // client.TripArray()[id].showForecast(res)

//         // client.TripArray()[id].dispatchEvent(weatherReceived)
        
//     })
// }

async function apiGET(query){
    let req = await fetch(query)

    try {
        const res = await req.json()
        return res
    } catch ( error ){
        console.log(error, 'apiGET error')
    }
}

function queryInit(data = {}){
    const array = []

    for (let [key,val] of Object.entries(data)){
        let str = `${key}=${val}`
        array.push(str)
    }

    let query = array.join('&')
    // return res.concat(query)
    return query
}

function getPixabay(data, id){
    let query = data.replaceAll(' ','_')
    getKey('pixabay')

    .then((res) => queryInit({q:query}, res))
    .then((q) => apiGET(q))

    .then((item) => {

        try {
            const pixabayInit = new CustomEvent('pixabayInit',{
                detail: {
                    id: id,
                    url: item.hits[0].webformatURL
                }
            })
            document.dispatchEvent(pixabayInit)

            console.log(item)
        } catch ( error ){
            
            let newQ = query.split('+')
            query = newQ[1].concat('+',newQ[2])
            console.log(query)
            getKey('pixabay')

            .then((res) => queryInit({q:query}, res))
            .then((q) => apiGET(q))

            .then((item) => {
                try { 
                    const pixabayInit = new CustomEvent('pixabayInit',{
                        detail: {
                            id: id,
                            url: item.hits[0].webformatURL
                        }
                    })
                    document.dispatchEvent(pixabayInit)

                    console.log(item)
                }
                catch( error ){
                    console.log('still didnt work!')
                }
            })

        }
        
    })
}

export { getGeoname, getWeather, getPixabay }


async function getGeoname(city){
    let query = queryInit({q: city})

    // doing this request on the client-side because i was simply having too many issues that i couldnt solve
    let request = await fetch(`http://api.geonames.org/searchJSON?username=georgmaterial&isNameRequired=true&maxRows=10&featureClass=P&${query}`)

    try {
        let res = await request.json()
        return res.geonames

    } catch (error) {
        console.log(error)
    }

}

async function getWeather(data){
    let query = queryInit(data)
    let request = await fetch(`http://localhost:3000/weather?${query}`)

    try {
        let res = await request.json()
        
        return res
    } catch (error) {
        console.log(error)
    }
}



function queryInit(data = {}){
    const array = []

    for (let [key,val] of Object.entries(data)){
        let keyStr = key.replaceAll(' ','-')
        let valStr = val.replaceAll(' ','-')
        let str = `${keyStr}=${valStr}`
        array.push(str)
    }

    let query = array.join('&')
    
    return query
}

async function getPixabay(data){

    let city = data.city.replaceAll(' ','_')

    let request = await fetch(`http://localhost:3000/pixabay`,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)

    })

    try {
        let res = await request.json()
        if (Object.hasOwn(res,city)){
            return res[city]
        } else {
            return res.default
        }
    } catch (error) {
        console.log(error)
    }
}

export { getGeoname, getWeather, getPixabay, queryInit }


async function getGeoname(city){
    let query = queryInit({q: city})
    let request = await fetch(`http://localhost:3000/geonames?${query}`,{
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        }

    })

    try {
        let res = request
        console.log(res)
        return res

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
        let keyStr = key.replaceAll(' ','_')
        let valStr = val.replaceAll(' ','_')
        let str = `${keyStr}=${valStr}`
        array.push(str)
    }

    let query = array.join('&')
    
    return query
}

async function getPixabay(data){

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
        if (Object.hasOwn(res,data.city)){
            return res.valueOf(data.city)
        } else {
            return res.default
        }
    } catch (error) {
        console.log(error)
    }
}

export { getGeoname, getWeather, getPixabay }
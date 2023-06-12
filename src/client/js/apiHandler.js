const getKey = async api => { 

    let req = await fetch(`http://localhost:8000/key?api=${api}`)

    try {
        const res = await req.json()
        return res 
    } catch ( error ){
        console.log(error, 'getKey error')
    }
}

function getCoordinates(city,country){

    getKey('geonames')

    .then(function(res){
        const query = 
            `${res.baseURL}username=${res.key}&q=${city}&isNameRequired=true&maxRows=10&featureClass=P`
        
        apiGET(query)

        .then((data)=>{

            for (let item of data.geonames){
                console.log(item)
                if (item.countryName == country){
                    let lat_long = {
                        "lat": item.lat,
                        "long": item.lng
                    }
                    console.log(item)
                    return lat_long
                }
            }
        })
        
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

export { getCoordinates }
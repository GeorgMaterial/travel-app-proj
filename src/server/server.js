const dotenv = require('dotenv')
dotenv.config()

import ('node-fetch')

// Setup empty JS object to act as endpoint for all routes
const sillyImage = 'https://memories-matter.blog/wp-content/uploads/2018/08/sillymona.png'

const projectData = {
    geonames: {}
};
const ImageEndpoint = {
    default: sillyImage
}
// 
const api_keys = {
    "pixabay": {
        "key": process.env.PIXABAY_API_KEY,
        "baseURL":`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&image_type=photo&category=places&orientation=horizontal&`
    },
    "weatherbit": {
        "key": process.env.WEATHERBIT_API_KEY,
        "baseURL": `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&`
    }
}

// Require Express to run server and routes
const express = require('express') ;

// Start up an instance of app
const app = express() ;
const bodyParser = require('body-parser') ;


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors') ;
app.use(cors()) ;

// Initialize the main project folder
app.use(express.static('dist'));



// Setup Server
const port = 3000;

const server = app.listen(port, listening) ;

function listening(){
    console.log('server running'); 
    console.log(`running on localhost: ${port}`) ;
}

// GET ROUTE - RETURNS PROJECTDATA OBJECT

async function apiGET(query){
    let req = await fetch(query)

    try {
        const res = await req.json()
        return res
    } catch ( error ){
        console.log(error, 'apiGET error')
    }
}

app.get('/weather', (req, res) => {
    let query = req._parsedOriginalUrl.query
    
    query = api_keys.weatherbit.baseURL.concat(query)
    apiGET(query)
    .then((data) => {
        res.send(data)
    })

})

app.post('/pixabay', async (req, res) => {
    const params = {
        city: req.body.city.replaceAll(' ','_'),
        prov: req.body.prov.replaceAll(' ','_'),
        country: req.body.country.replaceAll(' ','_')
    }

    let string = Object.values(params).join('+')
    let query = api_keys.pixabay.baseURL.concat('q=',string)
    let get = await apiGET(query)
    
    if (get.totalHits > 0){
        console.log(get.hits[0])
        ImageEndpoint[params.city] = get.hits[0].webformatURL
        res.send(ImageEndpoint)

    } else {
        let new_query = `q=${params.prov}+${params.country}`
        query = api_keys.pixabay.baseURL.concat(new_query)

        let get = await apiGET(query)

        if (get.totalHits > 0){
            console.log(get.hits[0])
            ImageEndpoint[params.city] = get.hits[0].webformatURL
            res.send(ImageEndpoint)
        } else {
            let new_query = `q=${params.country}`
            query = api_keys.pixabay.baseURL.concat(new_query)

            let get = await apiGET(query)

            if (get.totalHits > 0) {
                console.log(get.hits[0])
                ImageEndpoint[params.city] = get.hits[0].webformatURL
            }

            res.send(ImageEndpoint)
        }
    }
})


// query: { city: 'sydney', prov: 'new_south_wales', country: 'australia' }

app.get('/all', sendData) ;

function sendData (req, res) {
    res.send(projectData) ;
    console.log('projectData sent', projectData) ;
}

// POST Route - Add data to projectData (temp, date, user response)

// app.post('/add', receiveData)

// function receiveData (req, res){
    
//     projectData['date'] = req.body.date ;
//     projectData['temperature'] = req.body.temperature ;
//     projectData['userResponse'] = req.body.userResponse ;

//     res.send(req.body) ;
// }


// app.get('/key', (req, res)=>{
//     let api = req.query.api
//     res.send(api_keys[api])
// })



const dotenv = require('dotenv')
dotenv.config()

// Setup empty JS object to act as endpoint for all routes
const projectData = {};
// 
const api_keys = {
    "pixabay": {
        "baseURL":`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&image_type=photo&category=places&orientation=horizontal&`
    },
    "geonames": {
        "baseURL":`http://api.geonames.org/searchJSON?username=${process.env.GEONAMES_USER}&isNameRequired=true&maxRows=10&featureClass=P&`
    },
    "weatherbit": {
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
const port = 8000;

const server = app.listen(port, listening) ;

function listening(){
    console.log('server running'); 
    console.log(`running on localhost: ${port}`) ;
}

// GET ROUTE - RETURNS PROJECTDATA OBJECT

<<<<<<< Updated upstream
app.get('/all', sendData) ;

function sendData (req, res) {
    res.send(projectData) ;
    console.log('projectData sent', projectData) ;
}

// POST Route - Add data to projectData (temp, date, user response)

app.post('/add', receiveData)

function receiveData (req, res){
=======
async function apiGET(query){
    console.log('inside fetch')
    let req = await fetch(query)

    try {
        const res = await req.json()
        return res
    } catch ( error ){
        console.log(error, 'apiGET error')
    }
}

app.get('/weather', async (req, res) => {
    let query = req._parsedOriginalUrl.query
    
    query = api_keys.weatherbit.baseURL.concat(query)
    apiGET(query)
    .then((data) => {
        res.send(data)
    })

})

app.get('/geonames', async (req, res) => {
    let query = req._parsedOriginalUrl.query
>>>>>>> Stashed changes
    
    query = api_keys.geonames.baseURL.concat(query)
    console.log(query)
    apiGET(query)
    .then((data) => {
        res.send(data)
    })

})

app.get('/pixabay', async (req, res) => {
    let query = req._parsedOriginalUrl.query
    
    query = api_keys.pixabay.baseURL.concat(query)
    console.log(query)
    apiGET(query)
    .then((data) => {
        res.send(data)
    })

})


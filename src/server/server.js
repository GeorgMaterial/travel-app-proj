const dotenv = require('dotenv')
dotenv.config()

// Setup empty JS object to act as endpoint for all routes
const projectData = {};
// 
const api_keys = {
    "pixabay": {
        "key": process.env.PIXABAY_API_KEY,
        "baseURL":""
    },
    "geonames": {
        "key": process.env.GEONAMES_USER,
        "baseURL":"http://api.geonames.org/searchJSON?"
    },
    "weatherbit": {
        "key": process.env.WEATHERBIT_API_KEY,
        "baseURL": "https://api.weatherbit.io/v2.0/forecast/daily?"
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

app.get('/all', sendData) ;

function sendData (req, res) {
    res.send(projectData) ;
    console.log('projectData sent', projectData) ;
}

// POST Route - Add data to projectData (temp, date, user response)

app.post('/add', receiveData)

function receiveData (req, res){
    
    projectData['date'] = req.body.date ;
    projectData['temperature'] = req.body.temperature ;
    projectData['userResponse'] = req.body.userResponse ;

    res.send(req.body) ;
}


app.get('/key', (req, res)=>{
    let api = req.query.api
    res.send(api_keys[api])
})

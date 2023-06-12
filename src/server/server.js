// Setup empty JS object to act as endpoint for all routes
var projectData = {};

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
app.use(express.static('website'));


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

app.get('/form', formReceive)

function formReceive (req, res ) {
    console.log('form received');
}


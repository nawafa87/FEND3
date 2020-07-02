

// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require ('express');
// Start up an instance of app
const app = express();
/* Middleware*/

const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(8000, () => console.log('listening at 8000'));

app.use(express.static('website'));
app.use(express.json());

app.get('/all',(request,response)=>{
  response.send(projectData)
  console.log(projectData)  
});



app.post('/add',(request,response) =>{
    newEntery = {
        Temp:request.body.Temp,
        Date:request.body.Date,
        Feeling:request.body.Feeling
    }
    
    projectData.push(newEntery) 
    console.log('I got a Request!')
    console.log(projectData);
    response.send(projectData);
});
console.log('Hi Nawaf');
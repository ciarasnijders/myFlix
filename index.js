const express = require('express');
const morgan = require('morgan');
const movies = require('./data');

const app = express();

//Morgan middleware library to log all requests 
app.use(morgan('common'));

// GET requests

//GET route located at the endpoint “/” that returns a default textual response 
app.get('/', (req, res) => {
  res.send('Welcome to MyFlix!');
});

//Express GET route located at the endpoint “/movies” that returns movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

//express.static to serve your “documentation.html” file from the public folder 
app.use(express.static('public'));

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
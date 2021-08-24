const express = require('express');
const app = express();
let movies = [
  {
    title: 'Harry Potter and the Philosopher\'s Stone',
    director: 'Chris Columbus',
    producer: 'David Heyman',
    year: '2001'
  },
  {
    title: 'Titanic',
    director: 'James Cameron',
    producer: 'James Cameron, Jon Landau',
    year: '1997' 
  },
  {
    title: 'La La Land',
    director: 'Damien Chazelle',
    producer: 'Fred Berger, Jordan Horowitz',
    year: '2016'  
  },
  {
    title: 'Erin Brockovich',
    director: 'Steven Soderbergh',
    producer: 'Danny DeVito, Stacey Sher, Michael Shamberg',
    year: '2000'  
  },
  {
    title: 'Forrest Gump',
    director: 'Robert Zemeckis',
    producer: 'Wendy Fineman, Steve Tisch',
    year: '1994'  
  },
  {
    title: 'Matilda',
    director: 'Danny DeVito',
    producer: 'Danny DeVito, Michael Shamberg',
    year: '1996'  
  },
  {
    title: 'Jumanji',
    director: 'Joe Johnston',
    producer: 'Robert W. Cort, Ted Field, Larry Franco',
    year: '1995'  
  },
  {
    title: 'Taken',
    director: 'Pierre Morel',
    producer: 'Luc Besson',
    year: '2008'  
  },
  {
    title: 'The Green Mile',
    director: 'Frank Darabont',
    producer: 'Frank Darabont, David Valdes',
    year: '1999' 
  },
  {
    title: 'The Help',
    director: 'Tate Taylor',
    producer: 'Chris Columbus, Michael Barnathan, Brunson Green',
    year: '2011'  
  },
];

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
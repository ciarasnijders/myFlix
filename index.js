const express = require('express');
const morgan = require('morgan');
const data= require('./data');
const uuid = require('uuid');
const _ = require('lodash');

const app = express();

let movies = data.movies;
let users = data.users;

app.use(express.json());
//Morgan middleware library to log all requests 
app.use(morgan('common'));

//GET route located at the endpoint “/” that returns a default textual response 
app.get('/', (req, res) => {
  res.send('Welcome to MyFlix!');
});

//Express GET route located at the endpoint “/movies” that returns movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

//Express GET route located at the endpoint “/users that returns users
app.get('/users', (req, res) => {
  res.json(users);
});

//Gets the data about a single movie, by name
app.get('/movies/:name', (req, res) => {
  res.json(movies.find((movie) => { 
    return movie.title === req.params.name 
  }));
});

//Gets data about a genre by name
app.get('/movies/genre/:genre', (req, res) => {
  const moviesList = movies.filter((movie) => { 
    return movie.genre === req.params.genre 
  });
  const movieNames = _.map(moviesList, 'title')
  // const movieNames = moviesList.map((movie) => {
  //   return movie.title
  // });
  res.json(movieNames);
});

// Gets data about a director by name
app.get('/movies/director/:name', (req, res) => {
  const movie = movies.find((movie) => { 
    return movie.director.name === req.params.name 
  });
  res.json(movie.director);
});

//Gets the year of a movie
app.get('/movies/:name/year', (req, res) => {
  const movie = movies.find((movie) => { 
    return movie.title === req.params.name
  });
  res.json(movie.year);
})

//Gets the director of a movie
app.get('/movies/:name/director', (req, res) => {
  const movie = movies.find((movie) => { 
    return movie.title === req.params.name
  });
  res.json(movie.director.name);
})

//Adds data for a new movie to our list of movies
app.post('/movies', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

//posts data about the user (username, email, password)
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name || !newUser.email || !newUser.password) {
    const message = 'Missing data in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
})

//password policy
function checkPassword(str) { 
  // at least one number, one lowercase and one uppercase letter // at least six characters that are letters, numbers or the underscore.
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/
  return re.test(str); 
}

// Deletes a movie from list by name
app.delete('/movies/:name', (req, res) => {
  let movie = movies.find((movie) => { 
    return movie.title === req.params.name 
  });
  
  if (movie) {
    movies = movies.filter((movie) => { 
      return movie.title !== req.params.name 
    });
    res.status(201).send('Movie ' + req.params.name + ' was deleted.');
  }
});


//put data about the user that needs to be updated
app.put('/users/:id', (req, res) => {
  const user = users.find((user) => {
    return user.id === Number(req.params.id)
  });
  let newUser = req.body;
  if (!newUser.name || !newUser.email || !newUser.password) {
    const message = 'Missing data in request body';
    res.status(400).send(message);
  } else {
    const userIndex = users.indexOf(user);
    _.extend(newUser, { id: req.params.id });
    newUser = {id: req.params.id, ...newUser }
    users[userIndex] = newUser;
    res.status(200).send(users)
  }
})


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
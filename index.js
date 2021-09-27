const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');
const _ = require('lodash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;

app.use(express.json());
//Morgan middleware library to log all requests 
app.use(morgan('common'));

//GET route located at the endpoint “/” that returns a default textual response 
app.get('/', (req, res) => {
  res.send('Welcome to MyFlix!');
});

//Express GET route located at the endpoint “/movies” that returns movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
  .then(function(movies) {
    res.status(201).json(movies);

  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});


//Express GET route located at the endpoint “/users that returns users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Gets the data about a single movie, by name
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({title: req.params.title})
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send( 'Error: ' + err);
    });
});

//Gets data about a genre by name
app.get('/genres/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Genres.findOne({Name: req.params.Name})
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send( 'Error: ' + err);
    });
});

// Gets data about a director by name
app.get('/movies/director/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({'director.name': req.params.name})
    .then((movie) => {
      res.json(movie.director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send( 'Error: ' + err);
    });
});

//Gets the year of a movie
app.get('/movies/:title/year', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({name: req.params.title})
    .then((movie) => {
      res.json(movie.year);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send( 'Error: ' + err);
    });
});

//Gets the director of a movie
app.get('/movies/:title/director', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({title: req.params.title})
    .then((movie) => {
      res.json(movie.director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send( 'Error: ' + err);
    });
});


//Adds data for a new movie to our list of movies
app.post('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ title: req.body.title })
    .then((movie) => {
      if (movie) {
        return res.status(400).send(req.body.title + 'already exists');
      } else {
        Movies
          .create({
            title: req.body.title,
            description: req.body.description,
            year: req.body.year,
            genre:  req.body.genre,
            director: {
                name: req.body.director.name,
                bio: req.body.director.bio,
                birthYear: req.body.director.birthYear,
                deathYear: req.body.director.deathYear,
            },
            imageURL: req.body.imageURL, 
            featured: req.body.featured
          })
          .then((movie) =>{res.status(201).json(movie) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//posts data about the user (username, email, password)
app.post('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else if (!checkPassword(req.body.Password)) {
        const message = 'Invalid password format (password must have at least one number, one lowercase and one uppercase letter, at least six characters that are letters, numbers or the underscore).'
        res.status(400).send(message);
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
            Favorites: req.body.Favorites
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//password policy
function checkPassword(str) { 
  // at least one number, one lowercase and one uppercase letter // at least six characters that are letters, numbers or the underscore.
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/
  return re.test(str); 
}

// Deletes a movie from list by name
app.delete('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOneAndRemove({ title: req.params.title })
    .then((movie) => {
      if (!movie) {
        res.status(400).send(req.params.title + ' was not found');
      } else {
        res.status(200).send(req.params.title + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//delete a movie from list of favs
app.delete('/users/:Username/favorites/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { Favorites: req.params.id }
  },
  { new: true }, // This line makes sure that the updated document is returned
 (err, updatedUser) => {
   if (err) {
     console.error(err);
     res.status(500).send('Error: ' + err);
   } else {
     res.json(updatedUser);
   }
 });
});

// Delete/deregsiter a user 
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }),  (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


//put data about the user that needs to be updated
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
Users.findOneAndUpdate({ Username: req.params.Username }, {
  $set: req.body
},
{ new: true }, // This line makes sure that the updated document is returned
(err, updatedUser) => {
 if (err) {
   console.error(err);
   res.status(500).send('Error: ' + err);
 } else {
   res.json(updatedUser);
 }
});
});

//puts movie into user list of favs
app.put('/users/:Username/favorites/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { Favorites: req.params.MovieID }
  },
  { new: true }, // This line makes sure that the updated document is returned
 (err, updatedUser) => {
   if (err) {
     console.error(err);
     res.status(500).send('Error: ' + err);
   } else {
     res.json(updatedUser);
   }
 });
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
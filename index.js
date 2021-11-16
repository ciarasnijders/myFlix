const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const passport = require('passport');

const app = express();
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const cors = require('cors');


//Morgan middleware library to log all requests 
app.use(passport.initialize())
require('./passport');

app.use(morgan('common'));
app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'http://localhost:1234', 'http://localhost:54555'];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));

  // mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let auth = require('./auth')(app);

const {OK, RESOURCE_CREATED, NOT_FOUND, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, INTERNAL_SERVER_ERROR} = {
  "OK": 200,
  "RESOURCE_CREATED": 201,
  "NOT_FOUND": 404,
  "BAD_REQUEST": 400,
  "UNAUTHORIZED": 401,
  "FORBIDDEN": 403,
  "INTERNAL_SERVER_ERROR": 500
}

//GET route located at the endpoint “/” that returns a default textual response 
app.get('/', (req, res) => {
  res.send('Welcome to MyFlix!');
});

//Express GET route located at the endpoint “/movies” that returns movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
  .then(function(movies) {
    res.status(200).json(movies);

  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});
// app.get('/movies', (req, res) => {
//   Movies.find()
//   .then(function(movies) {
//     res.status(200).json(movies);

//   }).catch(function(error) {
//     console.error(error);
//     res.status(500).send("Error: " + error);
//   });
// });


//Express GET route located at the endpoint “/users that returns users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//the information of a specific user
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({Username: req.params.Username})
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json([])
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send( 'Error: ' + err);
    });
});

//Gets the data about a single movie, by name
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({title: req.params.title})
    .then((movies) => {
      if (movies) {
        res.json(movies);
      } else {
        res.status(404).json([])
      }
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


//Adds data for a new movie to list of movies
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
app.post('/users', [
  check('Username', 'Username is required').not().isEmpty(),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {
  // check the validation object for errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  let hashedPassword = Users.hashPassword(req.body.Password);
  
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
            Password: hashedPassword,
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
app.put('/users/:Username', [
  check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], passport.authenticate('jwt', { session: false }), (req, res) => {
  // check the validation object for errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  let hashedPassword = Users.hashPassword(req.body.Password);
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
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
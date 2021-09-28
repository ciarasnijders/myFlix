const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    year: String,
    genre:  String,
    director: {
        name: String,
        bio: String,
        birthYear: Date,
        deathYear: Date,
    },
    imageURL: String, 
    featured: Boolean
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    Favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};
  
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
};

let genreSchema = mongoose.Schema({
    Name: String,
    Description: String
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre', genreSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
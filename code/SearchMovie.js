// Third Party Libraries
var http = require('http');

// Custom Libraries 
var _api = require('./lib/API');
var _movie = require('./lib/MovieSummary');


// This function is used for searching movies based on additional info
// such as year of release, title, cast, director, etc. 
// As of now - search using Title, Director and Lead Actor is supported.
function searchMovie(searchTerm, quest) {
  var movies = [];
  var api = new _api.API();
  var moviesList = api.getMovies(searchTerm);

  for (var i=0 ; i < moviesList.length ; i++) {
    var movie = new _movie.MovieSummary(moviesList[i], quest);
    movies.push(movie);
  }

  return movies;
}


module.exports = {
  function: searchMovie,
  searchMovie: searchMovie
};
// Third Party Libraries
var config = require('config');
var http = require('http');

// Custom Libraries
var _api = require('./lib/API');
var _genreTrans = require('./lib/GenreTrans');
var _movie = require('./lib/MovieSummary');


// This function is called when we want to discover 
// all the movies based on genre or director or actor. 
function discoverMovies (person, genre) {

  // Make Query String from Query Object
  var api = new _api.API();
  var query = {
    "api_key": config.get('apiKey'),
    "language": "en-EN",
    "sort_by": "popularity.desc"
  };
  
  if (person != undefined) {
    query['with_people'] = person.id;
  }
  
  if (genre != undefined) {
    var genreID = _genreTrans.genreTrans(genre);
    query['with_genres'] = genreID;
  }

  movieQuery = http.makeQueryString(query);

  // Get response by making query to API
  var apiResponse = api.discoverMovie(movieQuery);
  var apiResults = apiResponse['results'];
  
  if (person != undefined) {
    for (var j=2; j<=apiResponse['total_pages']; j++) {
      if (apiResults.length<20) {
        query['page'] = j;
        movieQuery = http.makeQueryString(query);
        apiResults += api.discoverMovie(movieQuery)['results'];
      } else {
        break;
      }
    }
  }

  // Make movie objects from the response results and return
  // the list of movie objects.
  var movies = [];
  for (var i=0; i<apiResults.length; i++) {
    var movie = new _movie.MovieSummary(apiResults[i]);
    movies.push(movie);
  }
  return movies;
}


module.exports = {
  function: discoverMovies,
  discoverMovies: discoverMovies
}
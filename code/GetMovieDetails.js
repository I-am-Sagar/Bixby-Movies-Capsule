// Third Party Libraries
var config = require('config');
var http = require('http') ;

// Custom Libraries
var _api = require('./lib/API');
var _movieDetail = require('./lib/MovieDetail');


// This function is used when we need to get details of a particular movie.
// We can click on IMDB link of movie details and open it in mobile device's app.
// To access the device, we use $vivContext.
function getMovieDetail(movie, $vivContext) {
  var api = new _api.API();
  var movieInfo = api.getMovieDetails(movie.id);
  var parser = new _movieDetail.MovieDetail(movieInfo, $vivContext);
  return parser;
}


module.exports = {
  function: getMovieDetail,
  getMovieDetail: getMovieDetail
}

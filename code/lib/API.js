// Third Party Libraries
var config = require('config');
var http = require('http');


// All the API calls will be made using this library
function API() {
  // To initialize the API with basic configuration
  this.getConfig = function getConfig() {
    var query = http.makeQueryString({
      "api_key": "fd54ccf1ef3a6b27f6f0f62a20a5cc96"
    });
    var api = http.getUrl(config.get('apiConfig') + '?' + query);
    api = JSON.parse(api);
    return api;
  };

  // To get movies based on search term
  this.getMovies = function getMovies(searchTerm) {
    var query = http.makeQueryString({
      "api_key": "fd54ccf1ef3a6b27f6f0f62a20a5cc96",
      "query": searchTerm,
      "language": "en-EN"
    });
    var api = http.getUrl(config.get('apiSearch') + '/movie' + '?' + query);
    api = JSON.parse(api);
    return api['results'];
  };

  // To get the details of a particular movie
  this.getMovieDetails = function getMovieDetails(id) {
    var query = http.makeQueryString({
      "api_key": "fd54ccf1ef3a6b27f6f0f62a20a5cc96",
      "language": "en-EN"
    });
    var api = http.getUrl(config.get('apiFilm') + '/' + id + '?' + query);
    api = JSON.parse(api);
    return api;
  };

  // Get the list of the people involved in the movie
  this.getCredits = function getCredits(id) {
    var query = http.makeQueryString({
      "api_key": "fd54ccf1ef3a6b27f6f0f62a20a5cc96",
    });
    var api = http.getUrl(config.get('apiFilm') + '/' + id + '/credits' + '?' + query);
    api = JSON.parse(api);
    return api;
  };

  // To search for some particular person
  this.getPerson = function getPerson(searchTerm) {
    var query = http.makeQueryString({
      "api_key": "fd54ccf1ef3a6b27f6f0f62a20a5cc96",
      "query": searchTerm,
      "language": "en-EN"
    });
    var api = http.getUrl(config.get('apiSearch') + '/person' + '?' + query);
    api = JSON.parse(api);
    return api['results'];
  };

  // Try to find for movie based on some keywords
  this.discoverMovie = function discoverMovie(query) {
    var api = http.getUrl(config.get('discover') + '/movie' + '?' + query);
    api = JSON.parse(api);
    return api;
  };
}


module.exports = {
  API: API
};
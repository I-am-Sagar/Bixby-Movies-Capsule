// Third Party Libraries
var http = require('http')
var config = require('config')


// Helper function used for making search of the films
// based on genres.
function genreTrans(genre) {
  var query = http.makeQueryString({
    "api_key": config.get('apiKey')
  });

  var availableGenres = http.getUrl('https://api.themoviedb.org/3/genre/movie/list' + '?' + query);
  availableGenres = JSON.parse(availableGenres);

  for (var i=0; i<availableGenres['genres'].length; i++) {
    if (genre == availableGenres['genres'][i]["name"].toLowerCase()) {
      return availableGenres['genres'][i]["id"];
    }
  }
}


module.exports = {
  function: genreTrans,
  genreTrans: genreTrans
}
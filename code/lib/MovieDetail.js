// Third Party Libraires
var _api = require('./API');


// This function takes movie info and makes MovieDetail object of it
// and this object is then rendered as detailed view of that movie.
// $vivContext is used to access the device. 
function MovieDetail(movie, $vivContext) {
  // Get Featured People.
  var api = new _api.API();
  var featuredPeople = api.getCredits(movie['id']);
  for (var i=0; i < featuredPeople['crew'].length; i++) {
    if (featuredPeople['crew'][i]['job'] == 'Director') {
      this.director = featuredPeople['crew'][i]['name'];
      break;
    }
  };
  cast = []
  for (var i=0; i < featuredPeople['cast'].length; i++)  {
    if (featuredPeople['cast'][i]['order'] <= 10) {
      cast.push(featuredPeople['cast'][i]['name']);
    } else {
      break;
    }
  }
  this.cast = cast.join(', ');

  // Get Synopsis
  this.synopsis = movie['overview'];

  // Get IMDB Link
  if (movie['imdb_id'] && movie['imdb_id'] != undefined && movie['imdb_id'] != "") {
    this.imdbID = movie['imdb_id'];
    // accessing $vivContext to get the device
    var device = $vivContext.device ;
    if (device == 'bixby-mobile') {
      this.url = 'https://m.imdb.com/title/' + this.imdbID;
    } else {
      this.url = 'https://www.imdb.com/title/' + this.imdbID;
    }
  }
}


module.exports = {
  MovieDetail : MovieDetail
};
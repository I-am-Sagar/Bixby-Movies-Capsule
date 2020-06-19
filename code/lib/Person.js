// Custom Libraries
var _api = require('./API');
var _movie = require('./MovieSummary');


// This is a helper function which takes the person info
// and makes Person object out of it, which can be later
// used for output and other purposes as desired.
function Person(person) {

  this.id = person['id'];
  this.name = person['name'];

  if (person['known_for_department'] == 'Directing') {
    this.job = 'Director';
  } else if (person['known_for_department'] == 'Acting') {
    this.job = 'Actor';
  } else if (person['known_for_department'] == 'Production') {
    this.job = 'Productor';
  };

  // Fetch image of that person if available
  if (person['profile_path']) {
    var api = new _api.API();
    var apiConfig = api.getConfig();
    this.image = apiConfig['images']['secure_base_url'] + apiConfig['images']['poster_sizes'][0] + person['profile_path'];
  
  }
  
  // Make movie objects of all the featured movies of that person
  featuredMovies = [];
  for (var i=0; i<person['known_for'].length; i++){
    if (person['known_for'][i]['media_type'] == 'movie') {
      var movie_instance = new _movie.MovieSummary(person['known_for'][i]);
      featuredMovies.push(movie_instance.title);
    }
  }
  this.featuredMovies = featuredMovies;
  
  // Prune the person if no featured movie is found
  if (this.featuredMovies.length < 1) {
    this.pruning = true;
  }
}


module.exports = {
  function: Person,
  Person : Person
};
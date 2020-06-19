// Third Party Libaries
var _api = require('./API');


// Helper function that takes movie info and makes MovieSummary object.
// This object is used for outputing it as a element in the list
// of the movies which are discovered. 
function MovieSummary(movie, quest) {

  if (movie['release_date']) {
    this.year = movie['release_date'].split('-')[0];
  }

  this.title = movie['title'];
  this.id = movie['id'];
  
  if (quest != undefined) { 
    this.quest = quest;
  };
  
  var api = new _api.API();
  var apiConfig = api.getConfig();
  this.image = apiConfig['images']['secure_base_url'] + apiConfig['images']['poster_sizes'][0] + movie['poster_path'];

};


module.exports = {
  function: MovieSummary,
  MovieSummary : MovieSummary
};

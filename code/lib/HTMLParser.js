// Third Party Libraries
var http = require('http');


// Helper function to get image URL of the movie from 
// the main HTML page of that movie.
function htmlParser(id) {
  var html = http.getUrl('https://www.filmaffinity.com/en/film' + id + '.html');
  var image = html.split("movie-main-image-container")[1].split('itemprop')[1].split('src="')[1].split('" alt=')[0];
  return image;
}


module.exports = {
  htmlParser: htmlParser
};
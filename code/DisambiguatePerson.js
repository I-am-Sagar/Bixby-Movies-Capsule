// Custom Libraries
var _api = require('./lib/API');
var _person = require('./lib/Person');


// This function is used when there is confusion based on
// actor or director if the name provided matches with two
// or more possible people. 
function disambiguatePerson(searchTerm) {
  var person = [];
  var api = new _api.API();
  var response = api.getPerson(searchTerm);

  for (var i = 0; i < response.length; i++) {
    if (response[i]['known_for_department'] == 'Directing' || response[i]['known_for_department'] == 'Acting' || response[i]['known_for_department'] == 'Production') {
      personInstance = new _person.Person(response[i]);
      if (personInstance.pruning == undefined) {
        person.push(personInstance);
      }
    }
  }
  return person;
}


module.exports = {
  function: disambiguatePerson,
  disambiguatePerson: disambiguatePerson
}
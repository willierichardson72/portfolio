(function(module) {
  var entriesController = {};

  // DONE: Create the `articles` table when the controller first loads, with the code that used to be in index.html:
  // DONE: Setup a function that kicks off the fetching and rendering of articles, using the same
  // code that used to be in index.html.
  // Also be sure to hide all the main section elements, and reveal the #articles section:

  entriesController.index = function() {
    $('#about').hide();
    $('#entries').show();
    entries.createTable();
    entries.fetchAll(entryView.initIndexPage);
  };

  module.entriesController = entriesController;
})(window);

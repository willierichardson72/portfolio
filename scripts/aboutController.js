(function(module) {
  var aboutController = {};

  // DONE: Define a function that hides all main section elements, and then reveals just the #about section:
  aboutController.index = function() {
    repos.requestRepos(repoView.index);
    $('#about').show().siblings().hide();
  };

  module.aboutController = aboutController;
})(window);

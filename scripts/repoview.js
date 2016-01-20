(function(module) {
  var repoView = {};

  var ui = function() {
    var $about = $('#about');

    $about.find('ul').empty();
    $about.show().siblings().hide();
  };

  var render = function(repo) {
    var newLi = '<li><a href="' + repo.html_url + '">' + repo.name + '</a></li>';
    return newLi;
  };

  repoView.index = function(){
    ui();
    $('#about ul').append(
      repos.with('forks_count').map(render)
    );
  };
  module.repoView = repoView;
})(window);

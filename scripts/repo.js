(function(module) {
  var repos = {};

  repos.all = [];

repos.requestRepos = function(callback) {

  $.ajax({
    url: "https://api.github.com/users/willierichardson72/repos"
  var qs = '?per_page100&sort=updated';
  $.get('/github/users/willierichardson72' + qs)
  .done(function(data, message, xhr){
    console.log('repo data: ' + data);
    repos.all = data;
  })
  .done(callback);
};

repos.with = function (attr)
  return repos.all.filter(function(repo) {
    return repo[attr];
  });
};

module.repos = repos;
})(window);

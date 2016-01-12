var jobs = []

function Job (opts) {
  this.company = opts.company;
  this.title = opts.title;
  this.description = opts.description;
  this.dates= opts.dates;
  this.location = opts.location;
}

Job.prototype.toHtml = function() {
  var Job = Handlebars.compile($('article.template').text());

  this
  $newArticle.removeClass('template');
  if (!this.publishedOn) {
    $newJob.addClass('draft');
  }
  $newJob.attr('data-category', this.category);
  $newJob.attr('data-author', this.author)

  $newArticle.find('.byline a').html(this.author);
  $newArticle.find('.byline a').attr('href', this.authorUrl);
  $newArticle.find('h1:first').html(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time[pubdate]').attr('datetime', this.publishedOn)
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn)
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago')
  $newArticle.append('<hr>');
  return $newArticle;
}

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  articles.push(new Article(ele));
})

articles.forEach(function(a){
  $('#articles').append(a.toHtml())
});

function randomNumber(upper) {}

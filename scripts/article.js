(function (module) {
 function Diary (entries) {
  Object.keys(entries).forEach(function(e, index.keys) {
   this[e] = opts[e];
 },this);
}

Diary.all = []

Diary.prototype.toHtml = function() {
  var template = handlebars.compile($('#entries-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.date))/60/60/24/1000);
  this.date = this.date ? 'published' + this.daysAgo + 'days ago' : '(draft)';
  this.content = marked(this.content);

  return template(this);
};

Diary.loadAll = function(entryData) {
  rawData.sort(function(a,b) {
    return (new Date(b.date)) - (new Date(a.date));
  });

Diary.all = rawData.map(function(ele) {
      return new Diary(ele);
    });
  };

Diary.fetchAll = function(callback) {
  if (localStorage.rawData) {

  Diary.loadAll(JSON.parse(localStorage.entryData));
  diaryView.initIndexPage();
 } else {
$.getJSON('entryData.json', function(entryData) {
  Article.loadAll(entryData);
  localStorage.rawData = JSON.stringify(entryData);
  callback();
  });
 };
};
Article.numWordsAll = function() {
  return Article.all.map(function(article) {
    var words = article.body.split(' ');
    return words.length;
  }).reduce(function(a, b) {
    return a+b
    console.log(a+b)
  })
};

module.Diary = Diary
})(window);
console.log(Diary.all)

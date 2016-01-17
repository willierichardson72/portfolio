function Diary (entries) {
  this.date = entries.date;
  this.subject = entries.subject;
  this.content = entries.content;
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

entryData.forEach(function(ele) {
  Diary.all.push(new Diary(ele));
 })
}

Diary.fetchAll = function() {
  if (localStorage.rawData) {

  Diary.loadAll(JSON.parse(localStorage.entryData));
  diaryView.initIndexPage();

} else {
$.getJSON('entryData.json', function(entryData) {
  Article.loadAll(entryData);
  localStorage.rawData = JSON.stringify(entryData);
  diaryView.initIndexPage();
  });
 }
}

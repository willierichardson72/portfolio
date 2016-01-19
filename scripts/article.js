(function (module) {
 function Entry (info) {
  Object.keys(entries).forEach(function(e, index, keys) {
   this[e] = info[e];
 },this);
}

Entry.all = []

Entry.prototype.toHtml = function() {
  var template = handlebars.compile($('#entries-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published' + this.daysAgo + 'days ago' : '(draft)';
  this.content = marked(this.content);

  return template(this);
};

Entry.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS entries (' +
        'id INTEGER PRIMARY KEY, ' +
        'publishedOn VARCHAR(255) NOT NULL, ' +
        'subject VARCHAR(255) NOT NULL, ' +
        'content VARCHAR (255);',
      function(result) {
        console.log('Successfully set up the entries table.', result);
        if (callback) callback();
      }
    );
  };

  Entry.truncateTable = function(callback) {
    webDB.execute(
      'DELETE FROM entries;',
      callback
    );
  };

  Entry.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO entries (publishedOn, subject, content) VALUES (?, ?, ?);',
          'data': [this.publishedOn, this.subject, this.content],
        }
      ],
      callback
    );
  };

  Entry.prototype.deleteRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM articles WHERE id = ?;',
          'data': [this.id]
        }
      ],
      callback
    );
  };

  Entry.prototype.updateRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'UPDATE articles SET publishedOn = ?, subject = ?, content = ?, WHERE id = ?;',
          'data': [this.publishedOn, this.subject, this.content, this.id]
        }
      ],
      callback
    );
  };

  Entry.loadAll = function(rows) {
    Article.all = rows.map(function(ele) {
      return new Article(ele);
    });
  };

  Entry.fetchAll = function(next) {
    webDB.execute('SELECT * FROM entries ORDER BY publishedOn DESC', function(rows) {
      if (rows.length) {
        Entry.loadAll(rows);
        next();
      } else {
        $.getJSON('/data/entryData.json', function(rawData) {
          // Cache the json, so we don't need to request it next time:
          rawData.forEach(function(item) {
            var entry = new entry(item); // Instantiate an article based on item from JSON
            entry.insertRecord(); // Cache the article in DB
          });
          webDB.execute('SELECT * FROM entries', function(rows) {
            Entry.loadAll(rows);
            next();
          });
        });
      }
    });
  };

  module.Article = Article;
})(window);

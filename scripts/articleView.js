(function(module) {

  var diaryView = {};

  diaryView.populateFilters = function() {
    $('en').each(function() {
      if (!$(this).hasClass('template')) {
        var val = $(this).find('address a').text();
        var optionTag = '<option value="' + val + '">' + val + '</option>';
        $('#subject-filter').append(optionTag);

        val = $(this).attr('date-category');
        optionTag = '<option value="' + val + '">' + val + '</option>';
        if ($('#date-filter option[value="' + val + '"]').length === 0) {
          $('#date-filter').append(optionTag);
        }
      }
    });
  };

  articleView.handleSubjectFilter = function() {
    $('#subject-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-subject="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#subject-filter').val('');
    });
  };

  articleView.handleDateFilter = function() {
    $('#date-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[date-category="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#date-filter').val('');
    });
  };

  articleView.handleMainNav = function() {
    $('.main-nav').on('click', '.tab', function(e) {
      $('.tab-content').hide();
      $('#' + $(this).data('content')).fadeIn();
    });

    $('.main-nav .tab:first').click();
  };

  articleView.setTeasers = function() {
    $('.article-body *:nth-of-type(n+2)').hide();

    $('#articles').on('click', 'a.read-on', function(e) {
      e.preventDefault();
      $(this).parent().find('*').fadeIn();
      $(this).hide();
    });
  };

  articleView.initNewArticlePage = function() {
    $('.tab-content').show();
    $('#export-field').hide();
    $('#article-json').on('focus', function(){
      this.select();
    });

    $('#new-form').on('change', 'input, textarea', articleView.create);
  };

  articleView.create = function() {
    var article;
    $('#articles').empty();

    // Instantiate an article based on what's in the form fields:
    article = new Article({
      date: $('#entries-date').val(),
      subject: $('#entries-subject').val(),
      content: $('#entries-content').val(),
    });

    $('#entries').append(article.toHtml());

    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });

    // Export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
    $('#export-field').show();
    $('#entries-json').val(JSON.stringify(article) + ',');
  };

  articleView.initIndexPage = function() {
    console.log(Article.all)
    Article.all.forEach(function(a){
      $('#entries').append(a.toHtml())
    });

    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
  };

  articleView.initAdminPage = function() {
    // TODO: Call the Handlebars `.compile` function, which will return a function for you to use where needed.
    var template; // = ...?

    // DONE: We use `forEach` here because we are relying on the side-effects of the callback function:
    // appending to the DOM.
    // The callback is not required to return anything.
    Article.numWordsByAuthor().forEach(function(stat) {
      $('.author-stats').append(template(stat));
    })

    // DONE: Simply write the correct values to the page:
    $('#blog-stats .articles').text(Article.all.length);
    $('#blog-stats .words').text(Article.numWordsAll());
  };

  module.articleView = articleView;
})(window);

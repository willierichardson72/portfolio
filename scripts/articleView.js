(function(module) {

  var entryView = {};

  entryView.populateFilters = function() {
    $('entry').each(function() {
      if (!$(this).hasClass('template')) {
        var val = $(this).find('address a').text();
        var optionTag = '<option value="' + val + '">' + val + '</option>';
        if($('#publishedOn-filter option[value="' + val + '"]').length === 0) {
         $('#publishedOn-filter').append(optionTag);

        val = $(this).attr('date-category');
        optionTag = '<option value="' + val + '">' + val + '</option>';
        if ($('#subject-filter option[value="' + val + '"]').length === 0) {
          $('#subject-filter').append(optionTag);
        }
      }
    });
  };

  entryView.handleSubjectFilter = function() {
    $('#subject-filter').on('change', function() {
      if ($(this).val()) {
        $('entry').hide();
        $('entry[data-subject="' + $(this).val() + '"]').fadeIn();
      } else {
        $('entry').fadeIn();
        $('entry.template').hide();
      }
      $('#subject-filter').val('');
    });
  };

  entryView.handlepublishedOnFilter = function() {
    $('#publishedOn-filter').on('change', function() {
      if ($(this).val()) {
        $('entry').hide();
        $('entry[publishedOn-category="' + $(this).val() + '"]').fadeIn();
      } else {
        $('entry').fadeIn();
        $('entry.template').hide();
      }
      $('#pusblishedOn-filter').val('');
    });
  };

  // articleView.handleMainNav = function() {
  //   $('.main-nav').on('click', '.tab', function(e) {
  //     $('.tab-content').hide();
  //     $('#' + $(this).data('content')).fadeIn();
  //   });
  //
  //   $('.main-nav .tab:first').click();
  // };

  entryView.setTeasers = function() {
    $('.entry-content *:nth-of-type(n+2)').hide();

    $('#entries').on('click', 'a.read-on', function(e) {
      e.preventDefault();
      $(this).parent().find('*').fadeIn();
      $(this).hide();
    });
  };

  entryView.initNewEntryPage = function() {
    $('.tab-content').show();
    $('#export-field').hide();
    $('#-json').on('focus', function(){
      this.select();
    });

    $('#new-form').on('change', 'input, textarea', entryView.create);
  };

  entryView.create = function() {
    var entry;
    $('#entries').empty();

    // Instantiate an article based on what's in the form fields:
    entry = new Entry({
      date: $('#entries-publishedOn').val(),
      subject: $('#entries-subject').val(),
      content: $('#entries-content').val(),
    });

    $('#entries').append(entry.toHtml());

    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });

    // Export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
    $('#export-field').show();
    $('#entries-json').val(JSON.stringify(article) + ',');
  };

  entryView.initIndexPage = function() {
    console.log(Article.all)
    Entry.all.forEach(function(a){
      $('#entries').append(a.toHtml())
    });

    entryView.populateFilters();
    entryView.handleCategoryFilter();
    entryView.handleAuthorFilter();
    entryView.handleMainNav();
    entryView.setTeasers();
  };

  module.entryView = entryView;
})(window);

var icons = {};

icons.MainNav = function () {
  $('h1').hide().slideDown();
  var $li = $('li');
  $li.hide().each(function(index) {
    $(this).delay(700 * index).fadeIn(700);
  });
  $li.on('click', function() {
    $(this).fadeOut(700);
  });
});

$(document).ready(function() {
  icons.MainNav();
}

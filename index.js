var SCROLL_OFFSET = 30;

$(document).ready(function() {
  setupScrollSpy();
  $(window).scroll(handleBodyScroll);
  $('.local-nav-link').on('click', handleLocalNavLinkClick);
});

function setupScrollSpy() {
  $('body').scrollspy({
    target: '#navbar-links',
    offset: SCROLL_OFFSET*2
  });
}

function handleBodyScroll(event) {
  var scrollPosition = $(event.target).scrollTop();
  if (navbarShouldBeVisible(scrollPosition)) {
    showNavbar();
  } else {
    hideNavbar();
  }
}

function navbarShouldBeVisible(scrollPosition) {
  var threshold = getScrollThreshold();
  return scrollPosition > threshold;
}

function getScrollThreshold() {
  var element = $('#nav-options-container');
  var elementOffset = element.offset();
  var elementHeight = element.height();
  var offset = SCROLL_OFFSET + 1; // +1 to show nav when scrolling to first section
  return elementOffset.top + elementHeight - offset;
}

function showNavbar() {
  $('header').removeClass("hidden");
}

function hideNavbar() {
  $('header').addClass("hidden");
}

function handleLocalNavLinkClick(event) {
  event.preventDefault();
  var href = ($(event.currentTarget).attr('href'));
  scrollTo(href);
}

function scrollTo(selector) {
  var element = $(selector);
  var elementTop = element ? element.offset().top : 0;
  var offset = SCROLL_OFFSET;
  var scrollTop = elementTop - offset;
  $('body').animate({"scrollTop": scrollTop}, 'slow');
}

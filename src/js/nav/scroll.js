import scrollSpy from 'bootstrap/js/scrollspy';

let SCROLL_OFFSET;

export default function(scrollOffset = 30) {
  SCROLL_OFFSET = scrollOffset;
  $(window).scroll(handleBodyScroll);
  setupBootstrapScrollSpy(scrollOffset);
}

function setupBootstrapScrollSpy() {
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

import collapse from 'bootstrap/js/collapse';

export default function(scrollOffset = 30) {
  $('.local-nav-link').on('click', event => {
    event.preventDefault();
    const href = ($(event.currentTarget).attr('href'));
    scrollTo(href, scrollOffset);
  });
}

function scrollTo(selector, offset) {
  const element = $(selector);
  const elementTop = element ? element.offset().top : 0;
  const scrollTop = elementTop - offset;
  $('body').animate({"scrollTop": scrollTop}, 'slow');
}

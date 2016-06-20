var SCROLL_OFFSET = 30;

$(document).ready(function() {
  setupScrollSpy();
  $(window).scroll(handleBodyScroll);
  $('.local-nav-link').on('click', handleLocalNavLinkClick);
  $('#contactForm').submit(submitContact);
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

function submitContact(e) {
  e.preventDefault();
  var form = e.currentTarget;
  try {
    var contact = getFormData(form);
    checkContact(contact);
    sendContact(contact, form);
    // clearForm(form);
  } catch (error) {
    handleSubmitContactError(error, form);
    // e.preventDefault();
  }
}

function getFormData(form) {
  var data = {};
  var valuesArray = $(form).serializeArray();
  valuesArray.forEach(function(value) {
    data[value.name] = value.value;
  });
  return data;
}

function checkContact(data) {
  if (!data.Name || !data.Contact) {
    throw new Error('EMPTY_CONTACT_FIELD');
  }
}

function sendContact(contact, form) {
  $.post({
    url: 'https://formspree.io/belolapotkov.v@gmail.com',
    data: contact,
    dataType: 'json',
    success: function(data) {
      console.log('Success');
      clearForm(form);
    },
    error: function(error) {
      console.log('AJAX Error');
      console.log(error);
      clearForm(form);
    }
  });
}

function clearForm(form) {
  clearValues(form);
  clearErrorState(form);
}

function clearValues(form) {
  $(form).find('input').val('');
}

function handleSubmitContactError(error, form) {
  clearErrorState(form);
  if (error.message === 'EMPTY_CONTACT_FIELD') {
    notifyUserOnEmptyFields(form);
  } else {
    notifyUserOnUnknownError(form);
  }
}

function clearErrorState(form) {
  $(form).children('.form-group').removeClass('has-error');
  $(form).find('.error-msg').detach();
}

function notifyUserOnEmptyFields(form) {
  $(form).children('.form-group').addClass('has-error');
  var errorMsg = composeErrorMsg('Please fill the form to let me know how to reach you.');
  $(form).prepend(errorMsg);
}

function composeErrorMsg(msg) {
  var msgContainer = document.createElement('div');
  msgContainer.className = 'row alert alert-danger error-msg';
  msgContainer.innerHTML = msg;
  return msgContainer;
}

function notifyUserOnUnknownError(form) {
  var errorMsg = composeErrorMsg('Ooops, something unexpected happend. Anyway you can contact me using links above this message.');
  $(form).prepend(errorMsg);
}

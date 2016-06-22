export default function() {
  initAnimateCssMethod();
  $('#contactForm').submit(submitContact);
}

function initAnimateCssMethod() {
  $.fn.extend({
      animateCss: function (animationName) {
          var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
          $(this).addClass('animated ' + animationName).one(animationEnd, function() {
              $(this).removeClass('animated ' + animationName);
          });
      }
  });
}

function submitContact(e) {
  e.preventDefault();
  var form = e.currentTarget;
  try {
    clearErrorState(form);
    var contact = getFormData(form);
    checkContact(contact);
    sendContact(contact, form);
  } catch (error) {
    handleSubmitContactError(error, form);
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
    success: function() {
      handleSubmitContactSuccess(form);
    },
    error: function(error) {
      handleSubmitContactError(error, form);
    }
  });
}

function handleSubmitContactSuccess(form) {
  notifyUserOnSuccess(form);
  setTimeout(clearForm.bind(this, form), 4000);
}

function handleSubmitContactError(error, form) {
  clearErrorState(form);
  if (error.message === 'EMPTY_CONTACT_FIELD') {
    notifyUserOnEmptyFields(form);
  } else {
    notifyUserOnUnknownError(form);
  }
}

function notifyUserOnSuccess(form) {
  var button = $(form).find('button[type="submit"]');
  button.removeClass('btn-primary').addClass('btn-success').html('<i class="fa fa-check"></i>');
  button.animateCss('pulse');
  const successMsg = composeSuccessMsg('Thank you for providing contact. I\'ll reach you as soon as possible.');
  $(form).prepend(successMsg);
}

function composeSuccessMsg(msg) {
  var msgContainer = document.createElement('div');
  msgContainer.className = 'row alert alert-success success-msg';
  msgContainer.innerHTML = msg;
  return msgContainer;
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

function clearForm(form) {
  clearValues(form);
  clearErrorState(form);
  clearSuccessState(form);
}

function clearValues(form) {
  $(form).find('input').val('');
}

function clearErrorState(form) {
  $(form).children('.form-group').removeClass('has-error');
  $(form).find('.error-msg').detach();
}

function clearSuccessState(form) {
  $(form).find('button[type="submit"]').html('Send contact').removeClass('btn-success').addClass('btn-primary');
  $(form).find('.success-msg').detach();
}

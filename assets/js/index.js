/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/js";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _nav = __webpack_require__(1);

	var _nav2 = _interopRequireDefault(_nav);

	var _contactForm = __webpack_require__(2);

	var _contactForm2 = _interopRequireDefault(_contactForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$(document).ready(function () {
	  (0, _nav2.default)();
	  (0, _contactForm2.default)();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  setupScrollSpy();
	  $(window).scroll(handleBodyScroll);
	  $('.local-nav-link').on('click', handleLocalNavLinkClick);
	};

	var SCROLL_OFFSET = 30;

	function setupScrollSpy() {
	  $('body').scrollspy({
	    target: '#navbar-links',
	    offset: SCROLL_OFFSET * 2
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
	  var href = $(event.currentTarget).attr('href');
	  scrollTo(href);
	}

	function scrollTo(selector) {
	  var element = $(selector);
	  var elementTop = element ? element.offset().top : 0;
	  var offset = SCROLL_OFFSET;
	  var scrollTop = elementTop - offset;
	  $('body').animate({ "scrollTop": scrollTop }, 'slow');
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  $('#contactForm').submit(submitContact);
	};

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
	  valuesArray.forEach(function (value) {
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
	    success: function success() {
	      handleSubmitContactSuccess(form);
	    },
	    error: function error(_error) {
	      handleSubmitContactError(_error, form);
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
	  button.addClass('animated pulse');
	}

	function notifyUserOnEmptyFields(form) {
	  $(form).find('button[type="submit"]').addClass('animated shake');
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
	  $(form).find('button[type="submit"]').removeClass('animated shake ');
	}

	function clearSuccessState(form) {
	  $(form).find('button[type="submit"]').html('Send contact').removeClass('animated pulse btn-success').addClass('btn-primary');
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9pbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkNTRlY2U5ODZjZThkYzhmMzJkMiIsIndlYnBhY2s6Ly8vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9zcmMvbmF2LmpzIiwid2VicGFjazovLy9zcmMvY29udGFjdC1mb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvanNcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQ1NGVjZTk4NmNlOGRjOGYzMmQyXG4gKiovIiwiaW1wb3J0IHNldHVwTmF2IGZyb20gJy4vbmF2JztcbmltcG9ydCBzZXR1cENvbnRhY3RGb3JtIGZyb20gJy4vY29udGFjdC1mb3JtLmpzJztcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gIHNldHVwTmF2KCk7XG4gIHNldHVwQ29udGFjdEZvcm0oKTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2luZGV4LmpzXG4gKiovIiwiY29uc3QgU0NST0xMX09GRlNFVCA9IDMwO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgc2V0dXBTY3JvbGxTcHkoKTtcbiAgJCh3aW5kb3cpLnNjcm9sbChoYW5kbGVCb2R5U2Nyb2xsKTtcbiAgJCgnLmxvY2FsLW5hdi1saW5rJykub24oJ2NsaWNrJywgaGFuZGxlTG9jYWxOYXZMaW5rQ2xpY2spO1xufVxuXG5mdW5jdGlvbiBzZXR1cFNjcm9sbFNweSgpIHtcbiAgJCgnYm9keScpLnNjcm9sbHNweSh7XG4gICAgdGFyZ2V0OiAnI25hdmJhci1saW5rcycsXG4gICAgb2Zmc2V0OiBTQ1JPTExfT0ZGU0VUKjJcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUJvZHlTY3JvbGwoZXZlbnQpIHtcbiAgdmFyIHNjcm9sbFBvc2l0aW9uID0gJChldmVudC50YXJnZXQpLnNjcm9sbFRvcCgpO1xuICBpZiAobmF2YmFyU2hvdWxkQmVWaXNpYmxlKHNjcm9sbFBvc2l0aW9uKSkge1xuICAgIHNob3dOYXZiYXIoKTtcbiAgfSBlbHNlIHtcbiAgICBoaWRlTmF2YmFyKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbmF2YmFyU2hvdWxkQmVWaXNpYmxlKHNjcm9sbFBvc2l0aW9uKSB7XG4gIHZhciB0aHJlc2hvbGQgPSBnZXRTY3JvbGxUaHJlc2hvbGQoKTtcbiAgcmV0dXJuIHNjcm9sbFBvc2l0aW9uID4gdGhyZXNob2xkO1xufVxuXG5mdW5jdGlvbiBnZXRTY3JvbGxUaHJlc2hvbGQoKSB7XG4gIHZhciBlbGVtZW50ID0gJCgnI25hdi1vcHRpb25zLWNvbnRhaW5lcicpO1xuICB2YXIgZWxlbWVudE9mZnNldCA9IGVsZW1lbnQub2Zmc2V0KCk7XG4gIHZhciBlbGVtZW50SGVpZ2h0ID0gZWxlbWVudC5oZWlnaHQoKTtcbiAgdmFyIG9mZnNldCA9IFNDUk9MTF9PRkZTRVQgKyAxOyAvLyArMSB0byBzaG93IG5hdiB3aGVuIHNjcm9sbGluZyB0byBmaXJzdCBzZWN0aW9uXG4gIHJldHVybiBlbGVtZW50T2Zmc2V0LnRvcCArIGVsZW1lbnRIZWlnaHQgLSBvZmZzZXQ7XG59XG5cbmZ1bmN0aW9uIHNob3dOYXZiYXIoKSB7XG4gICQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xufVxuXG5mdW5jdGlvbiBoaWRlTmF2YmFyKCkge1xuICAkKCdoZWFkZXInKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlTG9jYWxOYXZMaW5rQ2xpY2soZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdmFyIGhyZWYgPSAoJChldmVudC5jdXJyZW50VGFyZ2V0KS5hdHRyKCdocmVmJykpO1xuICBzY3JvbGxUbyhocmVmKTtcbn1cblxuZnVuY3Rpb24gc2Nyb2xsVG8oc2VsZWN0b3IpIHtcbiAgdmFyIGVsZW1lbnQgPSAkKHNlbGVjdG9yKTtcbiAgdmFyIGVsZW1lbnRUb3AgPSBlbGVtZW50ID8gZWxlbWVudC5vZmZzZXQoKS50b3AgOiAwO1xuICB2YXIgb2Zmc2V0ID0gU0NST0xMX09GRlNFVDtcbiAgdmFyIHNjcm9sbFRvcCA9IGVsZW1lbnRUb3AgLSBvZmZzZXQ7XG4gICQoJ2JvZHknKS5hbmltYXRlKHtcInNjcm9sbFRvcFwiOiBzY3JvbGxUb3B9LCAnc2xvdycpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL25hdi5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICAkKCcjY29udGFjdEZvcm0nKS5zdWJtaXQoc3VibWl0Q29udGFjdCk7XG59XG5cbmZ1bmN0aW9uIHN1Ym1pdENvbnRhY3QoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHZhciBmb3JtID0gZS5jdXJyZW50VGFyZ2V0O1xuICB0cnkge1xuICAgIGNsZWFyRXJyb3JTdGF0ZShmb3JtKTtcbiAgICB2YXIgY29udGFjdCA9IGdldEZvcm1EYXRhKGZvcm0pO1xuICAgIGNoZWNrQ29udGFjdChjb250YWN0KTtcbiAgICBzZW5kQ29udGFjdChjb250YWN0LCBmb3JtKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBoYW5kbGVTdWJtaXRDb250YWN0RXJyb3IoZXJyb3IsIGZvcm0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZvcm1EYXRhKGZvcm0pIHtcbiAgdmFyIGRhdGEgPSB7fTtcbiAgdmFyIHZhbHVlc0FycmF5ID0gJChmb3JtKS5zZXJpYWxpemVBcnJheSgpO1xuICB2YWx1ZXNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgZGF0YVt2YWx1ZS5uYW1lXSA9IHZhbHVlLnZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQ29udGFjdChkYXRhKSB7XG4gIGlmICghZGF0YS5OYW1lIHx8ICFkYXRhLkNvbnRhY3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0VNUFRZX0NPTlRBQ1RfRklFTEQnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZW5kQ29udGFjdChjb250YWN0LCBmb3JtKSB7XG4gICQucG9zdCh7XG4gICAgdXJsOiAnaHR0cHM6Ly9mb3Jtc3ByZWUuaW8vYmVsb2xhcG90a292LnZAZ21haWwuY29tJyxcbiAgICBkYXRhOiBjb250YWN0LFxuICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XG4gICAgICBoYW5kbGVTdWJtaXRDb250YWN0U3VjY2Vzcyhmb3JtKTtcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbihlcnJvcikge1xuICAgICAgaGFuZGxlU3VibWl0Q29udGFjdEVycm9yKGVycm9yLCBmb3JtKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVTdWJtaXRDb250YWN0U3VjY2Vzcyhmb3JtKSB7XG4gIG5vdGlmeVVzZXJPblN1Y2Nlc3MoZm9ybSk7XG4gIHNldFRpbWVvdXQoY2xlYXJGb3JtLmJpbmQodGhpcywgZm9ybSksIDQwMDApO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVTdWJtaXRDb250YWN0RXJyb3IoZXJyb3IsIGZvcm0pIHtcbiAgY2xlYXJFcnJvclN0YXRlKGZvcm0pO1xuICBpZiAoZXJyb3IubWVzc2FnZSA9PT0gJ0VNUFRZX0NPTlRBQ1RfRklFTEQnKSB7XG4gICAgbm90aWZ5VXNlck9uRW1wdHlGaWVsZHMoZm9ybSk7XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5VXNlck9uVW5rbm93bkVycm9yKGZvcm0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5vdGlmeVVzZXJPblN1Y2Nlc3MoZm9ybSkge1xuICB2YXIgYnV0dG9uID0gJChmb3JtKS5maW5kKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpO1xuICBidXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzJykuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1jaGVja1wiPjwvaT4nKTtcbiAgYnV0dG9uLmFkZENsYXNzKCdhbmltYXRlZCBwdWxzZScpO1xufVxuXG5mdW5jdGlvbiBub3RpZnlVc2VyT25FbXB0eUZpZWxkcyhmb3JtKSB7XG4gICQoZm9ybSkuZmluZCgnYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKS5hZGRDbGFzcygnYW5pbWF0ZWQgc2hha2UnKTtcbiAgJChmb3JtKS5jaGlsZHJlbignLmZvcm0tZ3JvdXAnKS5hZGRDbGFzcygnaGFzLWVycm9yJyk7XG4gIHZhciBlcnJvck1zZyA9IGNvbXBvc2VFcnJvck1zZygnUGxlYXNlIGZpbGwgdGhlIGZvcm0gdG8gbGV0IG1lIGtub3cgaG93IHRvIHJlYWNoIHlvdS4nKTtcbiAgJChmb3JtKS5wcmVwZW5kKGVycm9yTXNnKTtcbn1cblxuZnVuY3Rpb24gY29tcG9zZUVycm9yTXNnKG1zZykge1xuICB2YXIgbXNnQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1zZ0NvbnRhaW5lci5jbGFzc05hbWUgPSAncm93IGFsZXJ0IGFsZXJ0LWRhbmdlciBlcnJvci1tc2cnO1xuICBtc2dDb250YWluZXIuaW5uZXJIVE1MID0gbXNnO1xuICByZXR1cm4gbXNnQ29udGFpbmVyO1xufVxuXG5mdW5jdGlvbiBub3RpZnlVc2VyT25Vbmtub3duRXJyb3IoZm9ybSkge1xuICB2YXIgZXJyb3JNc2cgPSBjb21wb3NlRXJyb3JNc2coJ09vb3BzLCBzb21ldGhpbmcgdW5leHBlY3RlZCBoYXBwZW5kLiBBbnl3YXkgeW91IGNhbiBjb250YWN0IG1lIHVzaW5nIGxpbmtzIGFib3ZlIHRoaXMgbWVzc2FnZS4nKTtcbiAgJChmb3JtKS5wcmVwZW5kKGVycm9yTXNnKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJGb3JtKGZvcm0pIHtcbiAgY2xlYXJWYWx1ZXMoZm9ybSk7XG4gIGNsZWFyRXJyb3JTdGF0ZShmb3JtKTtcbiAgY2xlYXJTdWNjZXNzU3RhdGUoZm9ybSk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyVmFsdWVzKGZvcm0pIHtcbiAgJChmb3JtKS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyRXJyb3JTdGF0ZShmb3JtKSB7XG4gICQoZm9ybSkuY2hpbGRyZW4oJy5mb3JtLWdyb3VwJykucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xuICAkKGZvcm0pLmZpbmQoJy5lcnJvci1tc2cnKS5kZXRhY2goKTtcbiAgJChmb3JtKS5maW5kKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpLnJlbW92ZUNsYXNzKCdhbmltYXRlZCBzaGFrZSAnKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJTdWNjZXNzU3RhdGUoZm9ybSkge1xuICAkKGZvcm0pLmZpbmQoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJykuaHRtbCgnU2VuZCBjb250YWN0JykucmVtb3ZlQ2xhc3MoJ2FuaW1hdGVkIHB1bHNlIGJ0bi1zdWNjZXNzJykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29udGFjdC1mb3JtLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9
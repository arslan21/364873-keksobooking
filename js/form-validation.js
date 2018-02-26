'use strict';
(function () {
  var noticeBlock = document.querySelector('.notice');
  var noticeForm = noticeBlock.querySelector('.notice__form');

  var addressField = noticeForm.querySelector('#address');
  var titleField = noticeForm.querySelector('#title');
  var priceField = noticeForm.querySelector('#price');
  var capacityField = noticeForm.querySelector('#capacity');

  var submitForm = noticeForm.querySelector('.form__submit');

  // Валидация полей
  function titleFieldValidation() {
    if (titleField.validity.tooShort) {
      return true;
    }

    if (titleField.validity.tooLong) {
      return true;
    }

    if (titleField.validity.valueMissing) {
      return true;
    }
    return false;
  }

  function priceFieldValidation() {
    if (priceField.validity.rangeUnderflow) {
      return true;
    }

    if (priceField.validity.rangeOverflow) {
      return true;
    }

    if (priceField.validity.valueMissing) {
      return true;
    }
    return false;
  }

  function addressFieldValidation() {
    if (addressField.value === '') {
      return true;
    }
    return false;
  }

  function capacityFieldValidation() {
    if (capacityField.options[capacityField.selectedIndex].disabled) {
      return true;
    }
    return false;
  }

  //  Маркировка незаполненных полей
  function invalidFieldBordering(validationState, field) {
    if (validationState) {
      field.setAttribute('style', 'border-color: red');
    } else {
      field.removeAttribute('style');
    }
  }

  function invalidFieldsMarking() {
    var titleFieldValidityState = titleFieldValidation();
    invalidFieldBordering(titleFieldValidityState, titleField);

    var priceFieldValidityState = priceFieldValidation();
    invalidFieldBordering(priceFieldValidityState, priceField);

    var addressFieldValidityState = addressFieldValidation();
    invalidFieldBordering(addressFieldValidityState, addressField);

    var capacityFieldValidityState = capacityFieldValidation();
    invalidFieldBordering(capacityFieldValidityState, capacityField);
  }

  //  проверка отправки формы

  function submitingForm(evt) {
    if (allFieldValidation()) {
      evt.preventDefault();
      invalidFieldsMarking();
    }
  }

  function allFieldValidation() {
    if (titleFieldValidation() || priceFieldValidation() || addressFieldValidation() || capacityFieldValidation()) {
      return true;
    }
    return false;
  }

  window.formValidation = {
    submitValidForm: function () {
      // отправка формы
      noticeForm.addEventListener('submit', function (evt) {
        window.backend.save(noticeForm, window.formReset.resetForm, window.errorMessage.showMessage);
        evt.preventDefault();
      });

      submitForm.addEventListener('click', function (evt) {
        submitingForm(evt);
      });
      submitForm.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, submitingForm);
      });
    }

  };

})();

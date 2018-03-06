'use strict';
(function () {
  var noticeBlock = document.querySelector('.notice');
  var noticeForm = noticeBlock.querySelector('.notice__form');

  var addressField = noticeForm.querySelector('#address');
  var titleField = noticeForm.querySelector('#title');
  var priceField = noticeForm.querySelector('#price');
  var capacityField = noticeForm.querySelector('#capacity');

  var fields = {
    address: {
      name: addressField,
      validator: addressFieldValidation
    },
    title: {
      name: titleField,
      validator: titleFieldValidation
    },
    price: {
      name: priceField,
      validator: priceFieldValidation
    },
    capacity: {
      name: capacityField,
      validator: capacityFieldValidation
    },
  };

  var submitForm = noticeForm.querySelector('.form__submit');

  // Валидация полей
  function titleFieldValidation() {
    if (titleField.validity.tooShort || titleField.validity.tooLong || titleField.validity.valueMissing) {
      return false;
    } else {
      return true;
    }
  }

  function priceFieldValidation() {
    if (priceField.validity.rangeUnderflow || priceField.validity.rangeOverflow || priceField.validity.valueMissing) {
      return false;
    } else {
      return true;
    }
  }

  function addressFieldValidation() {
    if (addressField.value === '') {
      return false;
    }
    return true;
  }

  function capacityFieldValidation() {
    if (capacityField.options[capacityField.selectedIndex].disabled) {
      return false;
    }
    return true;
  }

  //  Маркировка незаполненных полей
  function invalidFieldBordering(validationState, field) {
    field.setAttribute('style', 'border-color: white');
    if (!validationState()) {
      field.setAttribute('style', 'border-color: red');
    }
  }

  function invalidFieldsMarking() {
    Object.keys(fields).forEach(function (field) {
      invalidFieldBordering(fields[field].validator, fields[field].name);
    });
  }

  //  проверка отправки формы
  function allFieldValidation() {
    Object.keys(fields).forEach(function (field) {
      if (fields[field].validator) {
        return true;
      } else {
        return false;
      }
    });
  }

  window.formValidation = {
    submitValidForm: function () {
      // отправка формы
      noticeForm.addEventListener('submit', function (evt) {
        if (allFieldValidation()) {
          invalidFieldsMarking();
          evt.preventDefault();
          window.backend.save(noticeForm, window.form.reset, window.errorMessage.show);
        }
        evt.preventDefault();
      });

      submitForm.addEventListener('click', function () {
        invalidFieldsMarking();
      });
      submitForm.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, invalidFieldsMarking);
      });
    }

  };

})();

'use strict';

(function () {
  var noticeBlock = document.querySelector('.notice');
  var noticeForm = noticeBlock.querySelector('.notice__form');
  var resetForm = noticeForm.querySelector('.form__reset');

  window.formReset = {
    resetForm: function () {
      noticeForm.reset();
      noticeForm.classList.add('notice__form--disabled');
      window.form.deactivateNotice();
      window.card.closePopup();
      window.map.removePins();
      window.map.mapFaded();
      window.map.setStartAddress();
      window.form.setAddress();
    }
  }

})();

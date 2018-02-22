'use strict';

(function () {

  window.data = {
    pictures: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ],

    OFFER_TYPES: {
      flat: {
        name: 'Квартира',
        minPrice: 1000,
      },
      bungalo: {
        name: 'Бунгало',
        minPrice: 0,
      },
      house: {
        name: 'Дом',
        minPrice: 5000,
      },
      palace: {
        name: 'Дворец',
        minPrice: 10000,
      }
    }
  };

})();

'use strict';

(function () {
  var map = document.querySelector('.map');

  var template = document.querySelector('template').content;
  var templatePinButton = template.querySelector('.map__pin');
  var buttonImage = templatePinButton.querySelector('img');

  function activatePin(evt) {
    var mapPinActive = map.querySelector('.map__pin--active');
    if (mapPinActive !== null) {
      mapPinActive.classList.remove('map__pin--active');
    }
    if (map.querySelector('.popup') !== null) {
      map.querySelector('.popup').remove();
    }
    evt.currentTarget.classList.add('map__pin--active');
  }

  window.pin = {
    render: function (hotel) {
      var mapPin = templatePinButton.cloneNode(true);
      mapPin.setAttribute('style', 'left: ' + (hotel.location.x) + 'px;' + 'top: ' + (hotel.location.y - buttonImage.height) + 'px;');
      mapPin.querySelector('img').setAttribute('src', hotel.author.avatar);

      mapPin.addEventListener('click', function (evt) {
        activatePin(evt);
        window.card.getMapCard(hotel);
      });
      mapPin.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, activatePin);
      });
      return mapPin;
    }
  };
})();

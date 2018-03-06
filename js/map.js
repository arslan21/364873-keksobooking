'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var startAddress = {
    left: 50,
    top: 375
  };

  var startCoords = {};
  var diff = {};

  function getCoords(evt) {
    startCoords = {
      x: evt.pageX,
      y: evt.pageY,
    };

    diff = {
      x: startCoords.x - mapPinMain.offsetLeft,
      y: startCoords.y - mapPinMain.offsetTop
    };
  }

  function onMouseMove(moveEvt) {
    if (moveEvt.pageX - diff.x > 0 && moveEvt.pageX - diff.x < 1200 && moveEvt.pageY - diff.y > 150 && moveEvt.pageY - diff.y < 500) {
      mapPinMain.style.left = (moveEvt.pageX - diff.x) + 'px';
      mapPinMain.style.top = (moveEvt.pageY - diff.y) + 'px';
    } else {
      document.addEventListener('mouseup', onMouseUp);
    }
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    window.form.setAddress();

    document.removeEventListener('mousemove', onMouseMove);
    mapPinMain.removeEventListener('mouseup', onMouseUp);
  }

  function dragPin() {
    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      getCoords(evt);

      document.addEventListener('mousemove', onMouseMove);
      mapPinMain.addEventListener('mouseup', onMouseUp);
    });
  }

  window.map = {
    initialize: function () {
      dragPin();
      mapPinMain.addEventListener('mouseup', function (evt) {
        if (map.classList.contains('map--faded')) {
          window.backend.load(window.map.activate, window.errorMessage.show);
        }
        window.form.placeNotice(evt, window.map.getAddress());
        window.filter.activateFilters();
      });
    },

    activate: function (hotelList) {
      map.classList.remove('map--faded');
      window.map.data = hotelList;
      window.filter.getFilterValues();
    },

    getAddress: function () {
      var pinStyle = getComputedStyle(mapPinMain);
      var afterPinStyle = getComputedStyle(mapPinMain, '::after');

      var pinStyeLeft = parseInt(pinStyle.left, 10);
      var pinStyeTop = parseInt(pinStyle.top, 10);
      var pinStyeHeight = parseInt(pinStyle.height, 10);
      var afterPinStyeHeight = parseInt(afterPinStyle.borderTopWidth, 10);
      var mapPinMainX = pinStyeLeft;
      var mapPinMainY = pinStyeTop + (pinStyeHeight + afterPinStyeHeight) / 2;
      var address = {
        x: mapPinMainX,
        y: mapPinMainY
      };
      return address;
    },

    insertPins: function (sortedHotels) {
      window.map.removePins();
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < sortedHotels.length; i++) {
        var pinForInsert = window.pin.render(sortedHotels[i]);
        fragment.appendChild(pinForInsert);
        if (i === 4) {
          break;
        }
      }
      mapPins.appendChild(fragment);
    },

    removePins: function () {
      var pinsForRemove = mapPins.querySelectorAll('.map__pin');
      pinsForRemove.forEach(function (pin) {
        var pinClassList = pin.classList.value;
        if (pinClassList !== 'map__pin map__pin--main') {
          mapPins.removeChild(pin);
        }
      });
    },

    mapDeactivate: function () {
      map.classList.add('map--faded');
    },

    setStartAddress: function () {
      mapPinMain.style.top = startAddress.top + 'px';
      mapPinMain.style.left = startAddress.left + '%';
    }
  };
})();

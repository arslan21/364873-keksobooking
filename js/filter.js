'use strict';

(function () {
  var PRICE_RANK = {
    'middle': {
      min: 10000,
      max: 50000
    },
    'low': {
      min: 0,
      max: 10000
    },
    'high': {
      min: 50000,
      max: 1000000
    },

    'any': {
      min: 0,
      max: 10000000
    }
  };

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapFilters = mapFiltersContainer.querySelectorAll('.map__filter');
  var mapChekboxes = mapFiltersContainer.querySelectorAll('input');

  var typeFilter = map.querySelector('#housing-type');
  var priceFilter = map.querySelector('#housing-price');
  var roomsFilter = map.querySelector('#housing-rooms');
  var guestsFilter = map.querySelector('#housing-guests');
  var FeaturesFilterSet = map.querySelector('.map__filter-set');



  function NeedHotelOffer() {
    var guestsValue = guestsFilter.options[guestsFilter.selectedIndex].value;
    if (guestsValue !== 'any') {
      guestsValue = parseInt(guestsValue, 10);
    }
    var roomsValue = roomsFilter.options[roomsFilter.selectedIndex].value;
    if (roomsValue !== 'any') {
      roomsValue = parseInt(roomsValue, 10);
    }
    var typeValue = typeFilter.options[typeFilter.selectedIndex].value;
    var priceValue = priceFilter.options[priceFilter.selectedIndex].value;

    var checkboxes = FeaturesFilterSet.querySelectorAll('input');

    var inputsNeed = Array.from(checkboxes).filter(function (input) {
      return input.checked === true;
    });

    var featuresNeed = inputsNeed.map(function (input) {
      return input.value;
    });

    this.type = typeValue;
    this.price = priceValue;
    this.rooms = roomsValue;
    this.guests = guestsValue;
    this.features = featuresNeed;
  }

  function insertSortedPins() {
    window.card.closePopup();
    window.util.debounce(function () {
      window.filter.getFilterValues(window.filter.data);
      window.map.insertPins();
    }, 500);
  }

  window.filter = {
    activateFilters: function () {
      for (var i = 0; i < mapFilters.length; i++) {
        mapFilters[i].addEventListener('change', insertSortedPins);
      }
      for (var j = 0; j < mapChekboxes.length; j++) {
        mapChekboxes[j].addEventListener('change', insertSortedPins);
      }
    },

    getFilterValues: function (hotelList) {
      window.filter.sortedHotels = [];
      window.filter.data = hotelList;

      var needHotelOffer = new NeedHotelOffer();
      var sortedHotels = hotelList.filter(function (hotel) {
        var hotelOffer = hotel.offer;
        return (needHotelOffer.type === 'any' || hotelOffer.type === needHotelOffer.type) &&
          (needHotelOffer.rooms === 'any' || hotelOffer.rooms === needHotelOffer.rooms) &&
          (needHotelOffer.guests === 'any' || hotelOffer.guests >= needHotelOffer.guests) &&
          (needHotelOffer.price === 'any' || (hotelOffer.price >= PRICE_RANK[needHotelOffer.price].min && hotelOffer.price <= PRICE_RANK[needHotelOffer.price].max)) &&
          (needHotelOffer.features.length === 0 || window.util.checkArray(hotelOffer.features, needHotelOffer.features));
      });
      window.filter.sortedHotels = sortedHotels;
    },

    resetFilters: function () {
      mapFilters.forEach(function (item) {
        item.options.selectedIndex = 0;
      });
      mapChekboxes.forEach(function (item) {
        item.checked = false;
      });
    }
  };
})();

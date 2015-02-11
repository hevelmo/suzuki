// We'll use this variable as a namespace for some utilities.
var util = {};

// Utilities for geolocation.
util.geolocator = function() {
  // Max time to wait for user interaction.
  this.acceptTimeout = 5000;
};

// Callback that fires if the user has geolocation API.
util.geolocator.prototype.onHasGeolocationAPI = function() {};

// Callback that fires if the user does not have geolocation API.
util.geolocator.prototype.onHasNotGeolocationAPI = function() {};

// Callback that fires if the user does not accept the geolocation request.
util.geolocator.prototype.onTimeout = function() {};

// Callback that fires if the location API fails to properly locate the user.
util.geolocator.prototype.onFailedToLocate = function() {};

// Callback that fires if the location API succeeded on locating the user.
util.geolocator.prototype.onSuccess = function(res) {};

// Asks the user for permission to use geolocation.
//util.geolocator.prototype.locate = function() {
//  if (navigator.geolocation) {
//    var $that = this;

//    this.onHasGeolocationAPI();

    // Setting up a timer that will fire a onFailedToLocate() callback when no
    // data from the user is received.
//    window.setTimeout(
//      function() {
//        if ($that.__lookingUp) {
          // Still looking up? Fail now.
//          $that.onTimeout();
//        }
//      },
//      this.acceptTimeout
//    );

    // Trying to locate the user.
//    this.__lookingUp = true;

//    navigator.geolocation.getCurrentPosition(function(res) {
//      $that.__lookingUp = false;
//      $that.onSuccess(res);
//    }, function() {
//      $that.__lookingUp = false;
//      $that.onFailedToLocate();
//    });

//  } else {
//    this.onHasNotGeolocationAPI();
//  };
//};

// Utilities for communicating with the InstatDrive API.
util.api = function() {
  this.prefix = 'api/';
};

// Get a list of all concessionaires.
util.api.prototype.concessionaireList = function(companyId, callback) {
  $.ajax({
    'url': this.prefix + 'concessionaire/list/' + companyId,
    'success': callback
  });
};

// Utilities for Google Maps.
util.area = function() {

};

// Creates a Google Maps' polygon.
util.area.prototype.getPolygon = function(points) {
  var path = [];
  for (var i = 0; i < points.length; i++) {
    path.push(new google.maps.LatLng(points[i].lat, points[i].lng));
  }
  var polygon = new google.maps.Polygon({
    paths: path,
  });
  return polygon;
};

// Determines wheter a point is contained inside a given area.
util.area.prototype.isInsideArea = function(coord, area) {
  return google.maps.geometry.poly.containsLocation(coord, area);
};

util.area.prototype.humanAddress = function(ll, fn) {
  if (!fn) {
    fn = function() {};
  };
  var $that = this;

  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({'latLng': ll}, function(results, st) {
    if (st == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        fn(results[0]);
        // .formatted_address);
      }
    } else {
      // console.log("Geocoder failed due to: " + status);
    }
  });
}

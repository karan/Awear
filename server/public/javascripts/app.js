var myFirebaseRef = new Firebase("https://flickering-fire-9434.firebaseio.com/");
var yellow = '#FFDC00';
var green = '#2ECC40';
$('.page.soundcloud').addClass('hide');
$('.page.youtube').addClass('hide');
$('.page.maps').addClass('hide');

$(function() {

  var player;
  var widgetIframe = document.getElementById('sc-player'),
      widget = SC.Widget(widgetIframe);

  $('body').css('background', yellow);

  // Soundcloud
  if (document.location.hash === "#1") {
    $('.page.youtube').hide();
    $('.page.soundcloud').show();
    $('.page.maps').hide();

    myFirebaseRef.on('child_changed', function (snapshot) {
      var newPost = snapshot.val();
      console.log(newPost);
      if (newPost.UUID === "50522") {
        $('.page.soundcloud').removeClass('hide');
        $('.page.youtube').addClass('hide');
        $('.page.maps').addClass('hide');

        $('body').css('background', green);
        widget.bind(SC.Widget.Events.READY, function() {
          if (newPost.Gesture === 'spread') {
            widget.play();
          } else if (newPost.Gesture === 'fist') {
            widget.pause();
          }
        });
      } else {
        $('body').css('background', yellow);
      }
    });
  }

  // Youtube
  if (document.location.hash === "#2") {
    $('.page.youtube').show();
    $('.page.soundcloud').hide();
    $('.page.maps').hide();
    loadYoutubeVideo();
  }

  // Google Maps
  if (document.location.hash === "#3") {
    console.log("in 3");
    $('.page.youtube').hide();
    $('.page.soundcloud').hide();
    $('.page.maps').show();

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var startLocation;
    var endLocation;

    $.getJSON('http://maps.google.com/maps/api/geocode/json?address=' + 'box san francisco'.replace(' ', '+'), function (data) {
      endLocation = new google.maps.LatLng(
        data.results[0].geometry.location.lat,
        data.results[0].geometry.location.lng
      );
    });

    // setInterval(function () {
    //   getSpeech(function (result) {
    //     if (result) {
    //       zoomToQuery(result);
    //     }
    //   });
    // }, 5000);

    // Zooms the map to a location in the query (like 'New York')
    function zoomToQuery(query) {
      $.getJSON('http://maps.google.com/maps/api/geocode/json?address=' + query.replace(' ', '+'), function (data) {
        endLocation = new google.maps.LatLng(
          data.results[0].geometry.location.lat,
          data.results[0].geometry.location.lng
        );
        zoomToLocation(endLocation);
      });
    }

    // Zooms the map to a location
    // Location is a google.maps.LatLng
    function zoomToLocation(location) {
      var mapOptions = {
        zoom: 15,
        center: location
      };
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(map);
    }

    // Creates the google map on load
    function initialize() {
      directionsDisplay = new google.maps.DirectionsRenderer();

      navigator.geolocation.getCurrentPosition(function (loc) {
        startLocation = new google.maps.LatLng(loc.coords.latitude, loc.coords.longitude);
        zoomToLocation(startLocation);
      });
    }

    // Show the route from start to end
    // start and end can either be a query or a google.maps.LatLng
    function showRoute(start, end) {
      var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
      });
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    myFirebaseRef.on('child_changed', function (snapshot) {
      var newPost = snapshot.val();
      console.log(newPost);
      if (newPost.UUID === "28665") {
        $('.page.soundcloud').addClass('hide');
        $('.page.youtube').addClass('hide');
        $('.page.maps').removeClass('hide');
        // We are connected
        $('body').css('background', green);
        if (startLocation) {
          if (newPost.Gesture === 'fist') {
            directionsDisplay.setMap(null);
            setTimeout(function () {
              zoomToLocation(endLocation);
            }, 1000);
          } else if (newPost.Gesture === 'spread') {
            showRoute(startLocation, endLocation);
          }
        }
      } else {
        $('body').css('background', yellow);
      }
    });
  }
});


//////////////////////
// Youtube Handlers //
//////////////////////
function loadYoutubeVideo() {
  console.log("loading video");
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
  console.log("api ready");
  player = new YT.Player('yt-player', {
    height: '80%',
    width: '80%',
    playerVars: {
      listType:'playlist',
      list: 'PLl4T6p7km9dbQojQLEz4N7nUPf8ER9rwr'
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  console.log("player ready");
  myFirebaseRef.on('child_changed', function (snapshot) {
    var newPost = snapshot.val();
    console.log(newPost);

    if (newPost.UUID === "47826") {
      $('.page.soundcloud').addClass('hide');
      $('.page.youtube').removeClass('hide');
      $('.page.maps').addClass('hide');
      $('body').css('background', green);

      if (player && newPost.Gesture === 'spread') {
        console.log("in if");
        player.playVideo();
      } else if (player && newPost.Gesture === 'fist') {
        console.log("in else if");
        player.stopVideo();
      } else if (player && newPost.Gesture === 'wavein') {
        player.previousVideo();
      } else if (player && newPost.Gesture === 'waveout') {
        player.nextVideo();
      }

    } else {
      $('body').css('background', yellow);
    }
  });
}

/////////////////////////
// Soundcloud Handlers //
/////////////////////////

/////////////////////////
// Google Map Handlers //
/////////////////////////
function getSpeech(cb) {
  var recognition = new webkitSpeechRecognition();
  var interim_transcript = '';
  var final_transcript = '';
  recognition.start();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.onstart = function() {  };
  recognition.onresult = function(event) {
    var interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    cb(final_transcript);
  };
  recognition.onend = function() {
    cb(final_transcript);
  };
}

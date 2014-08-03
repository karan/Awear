var myFirebaseRef = new Firebase("https://flickering-fire-9434.firebaseio.com/");

$(function() {

  var player;
  var widgetIframe = document.getElementById('sc-player'),
      widget = SC.Widget(widgetIframe);

  $('body').css('background', 'yellow');

  // Soundcloud
  if (document.location.hash === "#1") {
    $('.page.youtube').hide();
    $('.page.soundcloud').show();
    $('.page.maps').hide();

    myFirebaseRef.on('child_changed', function (snapshot) {
      var newPost = snapshot.val();
      console.log(newPost);
      if (newPost.UUID === "50522") {
        $('body').css('background', 'green');
        $('#title').text(newPost.Gesture);
        widget.bind(SC.Widget.Events.READY, function() {
          if (newPost.Gesture === 'spread') {
            widget.play();
          } else if (newPost.Gesture === 'fist') {
            widget.pause();
          }
        });
      } else {
        $('body').css('background', 'red');
        $('#title').text('');
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

    function initialize() {
      directionsDisplay = new google.maps.DirectionsRenderer();

      navigator.geolocation.getCurrentPosition(function (loc) {
        var myLocation = new google.maps.LatLng(loc.coords.latitude, loc.coords.longitude);
        var mapOptions = {
          zoom: 15,
          center: myLocation
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        directionsDisplay.setMap(map);
        showRoute(myLocation, 'box, san francisco');
      });
    }

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
      $('#title').text(newPost.Gesture);
      if (newPost.UUID === "28665") {
        $('body').css('background', 'green');
        $('#title').text(newPost.Gesture);
      } else {
        $('body').css('background', 'red');
        $('#title').text('');
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
    height: '390',
    width: '640',
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
    $('#title').text(newPost.Gesture);

    if (newPost.UUID === "47826") {
      $('body').css('background', 'green');
      $('#title').text(newPost.Gesture);

      if (player && newPost.Gesture === 'spread') {
        console.log("in if");
        player.playVideo();
      } else if (player && newPost.Gesture === 'fist') {
        console.log("in else if");
        player.stopVideo();
      } else if (player && newPost.Gesture === 'wavein') {
        playlist.previousVideo();
      } else if (player && newPost.Gesture === 'waveout') {
        playlist.nextVideo();
      }

    } else {
      $('body').css('background', 'red');
      $('#title').text('');
    }
  });
}

/////////////////////////
// Soundcloud Handlers //
/////////////////////////



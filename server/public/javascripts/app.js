var myFirebaseRef = new Firebase("https://flickering-fire-9434.firebaseio.com/");

$(function() {

  var player;

  $('body').css('background', 'yellow');

  // Soundcloud
  if (document.location.hash === "#1") {
    myFirebaseRef.on('child_changed', function (snapshot) {
      var newPost = snapshot.val();
      console.log(newPost);
      if (newPost.UUID === "50522") {
        $('body').css('background', 'green');
        $('#title').text(newPost.Gesture);
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

  if (document.location.hash === "#3") {
    // Google Maps
    console.log("in 3");
    $('.page.youtube').hide();
    $('.page.soundcloud').hide();
    $('.page.maps').show();

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


// Youtube Handlers
function loadYoutubeVideo() {
  console.log("loading video");
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
  console.log("api ready");
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'IHVPn8VDXQA',
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
      }

    } else {
      $('body').css('background', 'red');
      $('#title').text('');
    }
  });
}

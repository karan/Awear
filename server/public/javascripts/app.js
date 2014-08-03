$(function() {

  var player;

  $('body').css('background', 'yellow');

  var myFirebaseRef = new Firebase("https://flickering-fire-9434.firebaseio.com/");

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

  if (document.location.hash === "#2") {
    loadYoutubeVideo();
  }

  if (document.location.hash === "#3") {
    console.log("in 3");
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

  // Youtube Handlers
  function loadYoutubeVideo() {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  function onYouTubeIframeAPIReady() {
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
    myFirebaseRef.on('child_changed', function (snapshot) {
      var newPost = snapshot.val();
      console.log(newPost);
      $('#title').text(newPost.Gesture);
      if (newPost.UUID === "47826") {
        $('body').css('background', 'green');
        $('#title').text(newPost.Gesture);
        
        if (newPost.Gesture === 'spread') {
          player.playVideo();
        } else if (newPost.Gesture === 'fist') {
          player.stopVideo();
        }

      } else {
        $('body').css('background', 'red');
        $('#title').text('');
      }
    });
  }

  
});

$(function() {

  // var socket = io.connect('http://localhost:3001');
  // // var Uuid = utils.randUuid();
  // var Uuid = "28665";

  $('body').css('background', 'yellow');

  // socket.on('someoneConnected', function (connectedUuid) {
  //   if (connectedUuid === Uuid) {
  //     $('body').css('background', 'green');
  //   } else {
  //     $('body').css('background', 'yellow');
  //   }
  // });

  // socket.on('gesture', function (gesture, uuid) {
  // });
  var myFirebaseRef = new Firebase("https://flickering-fire-9434.firebaseio.com/");

  if (document.location.hash === "#1") {
    // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'pmBoUttFKd4',
          events: {
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }

    myFirebaseRef.on('child_changed', function (snapshot) {
    var newPost = snapshot.val();
    if(newPost.UUID === "50522") {
      $('body').css('background', 'green');
    }
    else {
      $('body').css('background', 'red');
    }
    if(newPost.Gesture === "spread"){
      player.playVideo();
    }
  });
}

  if (document.location.hash === "#2") {
    myFirebaseRef.on('child_changed', function (snapshot) {
    var newPost = snapshot.val();
    if(newPost.UUID === "47826") {
      $('body').css('background', 'green');
    }
    else {
      $('body').css('background', 'red');
    }
    if(newPost.Gesture != "rest"){
      $('#title').text(newPost.Gesture);
    }
    else {
     $('#title').text("rest"); 
    }
  });
}

  if (document.location.hash === "#3") {
    myFirebaseRef.on('child_changed', function (snapshot) {
    var newPost = snapshot.val();
    if(newPost.UUID === "28665") {
      $('body').css('background', 'green');
    }
    else {
      $('body').css('background', 'red');
    }
    if(newPost.Gesture != "rest"){
      $('#title').text(newPost.Gesture);
    }
    else {
     $('#title').text("rest"); 
    }
  });
}
  // alert(newPost.Gesture);
  
});

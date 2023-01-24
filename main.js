
// Select all the elements in the HTML page
// and assign them to a variable
 now_playing = $(".now-playing")
 track_art = $(".track-art")
 track_name = $(".track-name")
 track_artist = $(".track-artist")
 
 playpause_btn = $(".playpause-track")
 next_btn = $(".next-track")
 prev_btn = $(".prev-track")
 
 seek_slider = $(".seek_slider")
 volume_slider = $(".volume_slider")
 curr_time = $(".current-time")
 total_duration = $(".total-duration")
 
// Specify globally used values
 track_index = 0
 isPlaying = false
 updateTimer = undefined
 


// Define the list of tracks that have to be played
 track_list = [
  {
    name: "On & On",
    artist: "Erykah Badu",
    image: "Tracks/Erykah%20Badu.jpeg",
    path: "Tracks/Erykah%20Badu%20-%20On%20&%20On.mp3",
    Youtube: "https://www.youtube.com/watch?v=-CPCs7vVz6s"
  }, 
  {
    name: "Infrared",
    artist: "Ktyb",
    image: "Tracks/Ktyb.jpeg",
    path: "Tracks/KTYB%20-%20INFRARED.mp3",
    Youtube: "https://www.youtube.com/watch?v=Mr0Sdxl--iM"
  },
  {
    name: "It's not right",
    artist: "Gianni Romano",
    image: "Tracks/Whitney.jpeg",
    path: "Tracks/Emanuele%20Esposito%20&%20Gianni%20Romano%20-%20It's%20Not%20Right%20(Feat.%20Helen%20Tesfazghi).mp3",
    Youtube: "https://www.youtube.com/watch?v=M4w0-TnKMWY"
  },
  {
    name: "CELINE 3x",
    artist: "Gazo",
    image: "Tracks/Gazo.jpeg",
    path: "Tracks/GAZO%20-%20CELINE%203x.mp3",
    Youtube: "https://www.youtube.com/watch?v=wWblPXLnv6k"
  },
  {
    name: "Mannschaft",
    artist: "SCH feat. Freeze Corleone",
    image: "Tracks/SCH.jpeg",
    path: "Tracks/SCH%20-%20Mannschaft%20feat.%20Freeze%20Corleone.mp3",
    Youtube: "https://youtu.be/cgDZN44WpoE"
  },
  {
    name: "Tell Me More And More And Then Some",
    artist: "Nina Simone",
    image: "Tracks/Nina.jpeg",
    path: "Tracks/Nina%20Simone%20-%20Tell%20Me%20More%20And%20More%20And%20Then%20Some.mp3",
    Youtube: "https://youtu.be/VyuA8kW_TsI"
  }
]
function each(coll, f) { 
  if (Array.isArray(coll)) { 
        for (var i = 0; i < coll.length; i++) { 
              f(coll[i], i); 
        } 
  } else { 
        for (var key in coll) { 
              f(coll[key], key); 
        } 
  } 
} 

function reduce(array, f, start) { 
  var acc = start; 
  each(array, function(element) { 
        acc = f(acc, element); 
  }); 
  return acc; 
}

function every (arr, f) {
  return reduce(arr, function(bool, num) { 
      if (!f(num)) {
      bool=false}
      return bool
}, true)
}

curr_track=undefined
function updateSource(src) {
  curr_track=$("<audio id=''></audio>")
  source = $("<source src='' type='audio/ogg'>")
  source.attr("src", src)
  curr_track.append(source)
  curr_track.attr("id",`${track_list[track_index].name}`)
  a=$("audio").get()
  b=every(a,function (audio) {
    return !($(audio).attr("id")==track_list[track_index].name)
  })
  if (b) {$("body").append(curr_track)}
  else {curr_track=$(a[track_index])}
}
function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer)
    resetValues()
    // Load a new track
    //updateSource(`${track_list[track_index].path}`)
    updateSource(track_list[track_index].path)
    curr_track.trigger('load')
   
    // Update details of the track
    $(".track_art").css("background-image","url(" + track_list[track_index].image  + ")")
    track_name.text(`${track_list[track_index].name}`) 
    track_artist.text(`${track_list[track_index].artist}`)
    now_playing.text("PLAYING " + (track_index + 1) + " OF " + track_list.length)
      
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000)
   
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.on("ended", nextTrack)
   
    // Apply a random background color
    //random_bg_color()
  }
  /*bgColor=undefined
  function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    red = Math.floor(Math.random() * 192) + 64;
    green = Math.floor(Math.random() * 192) + 64;
    blue = Math.floor(Math.random() * 192) + 64;
   
    // Construct a color with the given values
    bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
   
    // Set the background to the new color
    $("body").css("background","bgColor")
  }*/
   
  // Function to reset all values to their default
  function resetValues() {
    curr_time.text("00:00")
    total_duration.text("00:00")
    seek_slider.val("0")
  }

  function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack()
    else pauseTrack()
  }
   
  function playTrack() {
    // Play the loaded track
    curr_track.trigger("play")
    //curr_track.trigger('play')
    isPlaying = true
   
    // Replace icon with the pause icon
    playpause_btn.html('<i class="fa fa-pause-circle fa-5x"></i>')
  }
   
  function pauseTrack() {
    // Pause the loaded track
    curr_track.trigger("pause")
    isPlaying = false;
   
    // Replace icon with the play icon
    playpause_btn.html('<i class="fa fa-play-circle fa-5x"></i>')
  }
   
  function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    a=$("audio").get()
    if (track_index < track_list.length - 1)
      {track_index += 1
        $(a[track_index-1]).trigger("pause")
    }
    else {track_index = 0
      $(a[track_list.length - 1]).trigger("pause")
    }
   
    // Load and play the new track
    
    loadTrack(track_index)
    
    playTrack()
  }
   
  function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    a=$("audio").get()
    if (track_index > 0)
      {track_index -= 1
        $(a[track_index+1]).trigger("pause")
      }
    else {
      $(a[0]).trigger("pause")
      track_index = track_list.length - 1}
     
    // Load and play the new track
    loadTrack(track_index)
    playTrack()
  }
  
  function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    a=$("audio").get()
    seekto = a[track_index].duration* (seek_slider.val() / 100)
    // Set the current track position to the calculated seek position
    a[track_index].currentTime=seekto
  }
   
  function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    a=$("audio").get()
    a[track_index].volume=volume_slider.val() / 100
  }
   
  function seekUpdate() {
    seekPosition = 0
    a=$("audio").get()

    // Check if the current track duration is a legible number
    if (!isNaN(a[track_index].duration)) {
      seekPosition = a[track_index].currentTime * (100 / a[track_index].duration) 
      seek_slider.val(`${seekPosition}`)
   
      // Calculate the time left and the total duration
      currentMinutes = Math.floor(a[track_index].currentTime/ 60);
      currentSeconds = Math.floor(a[track_index].currentTime - currentMinutes * 60);
      durationMinutes = Math.floor(a[track_index].duration / 60);
      durationSeconds = Math.floor(a[track_index].duration- durationMinutes * 60);
   
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds}
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes }
   
      // Display the updated duration
      curr_time.text(currentMinutes + ":" + currentSeconds)
      total_duration.text(durationMinutes + ":" + durationSeconds)
    }
  }
  loadTrack(0)
  
  function redirect() {
    window.location.replace(track_list[track_index].Youtube)
  }
  
  function filter(array, predicate) {
    var acc = [];
    each(array, function(element) {
      if (predicate(element)) {
        acc.push(element);
      }
    });
    return acc;
  }
list1=track_list
function search () {
  e=$("#search").val().toLowerCase()
  $("#search").val("") 
  res=filter(track_list, function (obj) {return obj.name.toLowerCase().includes(e) || obj.artist.toLowerCase().includes(e)})
  if (e=="" || e==" ") {res=list1}
  track_list=res
  track_index=0
  $("audio").remove()
  for (var i=0; i<res.length; i++) {
    loadTrack(i)
  }
  }
  
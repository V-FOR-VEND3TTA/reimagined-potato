// get the controls
const myVideo = document.getElementById("myVideo");
const btnPlay = document.getElementById("btnPlay");
const btnPause = document.getElementById("btnPause");
const btnStop = document.getElementById("btnStop");
const timeOut = document.getElementById("timeOut");
const vidNumOut = document.getElementById("vidNum");
let timer = null;

// listen for when...
btnPlay.addEventListener("click", vidAction);
btnPause.addEventListener("click", vidAction);
btnStop.addEventListener("click", vidAction);
btnNext.addEventListener("click", nextVideo);
myVideo.addEventListener("ended", vidEnded); // Allows us to go on to the next video automatically

// Videos in an array
const vids = [
  "Bill Burr.mp4",
  "Billions_Become_a_bank.mp4",
  "Billions S05E03.mp4",
  "Mr Robot.mp4",
];
let vidPlaying = 0;

// Cover all the functionality of all these events
function vidAction(event) {
  switch (event.target.id) {
    case "btnPlay":
      playVideo();
      timer = setInterval(update, 100);
      break;
    case "btnPause":
      myVideo.pause();
      break;
    case "btnStop":
      myVideo.pause();
      myVideo.currentTime = 0;
      break;
  }
}

function playVideo() {
  myVideo.play();
  timer = setInterval(update, 100); // run the update func every 100ms to update the UI
}

function update() {
  timeOut.innerHTML =
    "Time: " + myTime(myVideo.currentTime) + "/" + myTime(myVideo.duration);
}

// Takes the time and converts it into human readable format of hrs, mins, and secs
function myTime(time) {
  var hr = ~~(time / 3600);
  var min = ~~((time % 3600) / 60);
  var sec = time % 60;
  var sec_min = "";
  if (hr > 0) {
    sec_min += "" + hrs + ":" + (min < 10 ? "0" : "");
  }
  sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
  sec_min += "" + Math.round(sec);
  return sec_min;
}

// Resets the timer to zero once the video has ended
function vidEnded() {
  clearInterval(timer);
  timeOut.innerHTML = "Timer: 0";
  nextVideo();
  playVideo();
}

// Playing the next video
function nextVideo() {
  if (vidPlaying < 3) {
    vidPlaying++;
  } else {
    vidPlaying = 0;
  }
  myVideo.src = "videos/" + vids[vidPlaying];
  vidNum.innerHTML = vidPlaying + 1 + "/4";
}

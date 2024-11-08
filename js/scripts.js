const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resetBtn = document.getElementById("resetBtn");

let interval;
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isPaused = false;

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resumeBtn.addEventListener("click", resumeTimer);
resetBtn.addEventListener("click", resetTimer);

function saveTimeLocalIfNull(){
  
}

function saveTimeLocal() {
  localStorage.setItem('hours', hours);
  localStorage.setItem('minutes', minutes);
  localStorage.setItem('seconds', seconds);
  localStorage.setItem('milliseconds', milliseconds);
}

function loadTimeLocal() {
  hours = localStorage.getItem('hours');
  minutes = localStorage.getItem('minutes');
  seconds = localStorage.getItem('seconds');
  milliseconds = localStorage.getItem('milliseconds');

  if (hours != null) hoursEl.innerHTML = formatTime(hours);
  if (minutes != null) minutesEl.innerHTML = formatTime(minutes);
  if (seconds != null) secondsEl.innerHTML = formatTime(seconds);
  if (milliseconds != null) millisecondsEl.innerHTML = formatMilliseconds(milliseconds);
}

function setTime(timeToSet) {
  console.log(timeToSet);
  switch (timeToSet) {
    case 'h':
      console.log(timeToSet);
      hours = document.getElementById("hText").value;
      hoursEl.innerHTML = formatTime(hours);
      break;
    case 'min':
      console.log(timeToSet);
      minutes = document.getElementById("minText").value;
      minutesEl.innerHTML = formatTime(minutes);
      break;
    case 'seg':
      console.log(timeToSet);
      seconds = document.getElementById("segText").value;
      secondsEl.innerHTML = formatTime(seconds);
      break;
    case 'mil':
      console.log(timeToSet);
      milliseconds = document.getElementById("milText").value;
      millisecondsEl.innerHTML = formatMilliseconds(milliseconds);
      break;
    default:
      break;
  }
}

function startTimer() {
  interval = setInterval(() => {
    if (!isPaused) {
      milliseconds += 10;
      if (milliseconds >= 1000) {
        seconds++;
        milliseconds = 0;
      }
      if (seconds >= 60) {
        minutes++;
        seconds = 0;
      }
      if (minutes >= 60) {
        hours++;
        minutes = 0;
      }
      hoursEl.innerHTML = formatTime(hours);
      minutesEl.innerHTML = formatTime(minutes);
      secondsEl.innerHTML = formatTime(seconds);
      millisecondsEl.innerHTML = formatMilliseconds(milliseconds);
    }
  }, 10);
  startBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}

function pauseTimer() {
  isPaused = true;
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "inline-block";
}

function resumeTimer() {
  isPaused = false;
  resumeBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}

function resetTimer() {
  clearInterval(interval);
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  isPaused = false;
  hoursEl.innerHTML = "00";
  minutesEl.innerHTML = "00";
  secondsEl.innerHTML = "00";
  millisecondsEl.innerHTML = "000";
  startBtn.style.display = "inline-block";
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "none";
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function formatMilliseconds(time) {
  return time < 100 ? `0${time}`.padStart(3, "0") : time;
}

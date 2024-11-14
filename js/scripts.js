const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resetBtn = document.getElementById("resetBtn");

let startTime, elapsedTime = 0;
let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let timerInterval;

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resumeBtn.addEventListener("click", resumeTimer);
resetBtn.addEventListener("click", resetTimer);

function saveTimeLocal() {
  localStorage.setItem('hours', hours);
  localStorage.setItem('minutes', minutes);
  localStorage.setItem('seconds', seconds);
  localStorage.setItem('milliseconds', milliseconds);
}

function loadTimeLocal() {
  hours = parseInt(localStorage.getItem('hours')) || 0;
  minutes = parseInt(localStorage.getItem('minutes')) || 0;
  seconds = parseInt(localStorage.getItem('seconds')) || 0;
  milliseconds = parseInt(localStorage.getItem('milliseconds')) || 0;
  
  elapsedTime = hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
  updateDisplay(hours, minutes, seconds, milliseconds);
}

function setTime(timeToSet) {
  switch (timeToSet) {
    case 'h':
      hours = parseInt(document.getElementById("hText").value) || 0;
      break;
    case 'min':
      minutes = parseInt(document.getElementById("minText").value) || 0;
      break;
    case 'seg':
      seconds = parseInt(document.getElementById("segText").value) || 0;
      break;
    case 'mil':
      milliseconds = parseInt(document.getElementById("milText").value) || 0;
      break;
  }
  elapsedTime = hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
  updateDisplay(hours, minutes, seconds, milliseconds);
}

function startTimer() {
  startTime = performance.now() - elapsedTime;
  timerInterval = requestAnimationFrame(updateTimer);
  startBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}

function pauseTimer() {
  elapsedTime = performance.now() - startTime;
  cancelAnimationFrame(timerInterval);
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "inline-block";
}

function resumeTimer() {
  startTime = performance.now() - elapsedTime;
  timerInterval = requestAnimationFrame(updateTimer);
  resumeBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}

function resetTimer() {
  cancelAnimationFrame(timerInterval);
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  elapsedTime = 0;
  updateDisplay(0, 0, 0, 0);
  startBtn.style.display = "inline-block";
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "none";
}

function updateTimer() {
  elapsedTime = performance.now() - startTime;

  const totalMilliseconds = Math.floor(elapsedTime);
  const h = Math.floor(totalMilliseconds / 3600000);
  const m = Math.floor((totalMilliseconds % 3600000) / 60000);
  const s = Math.floor((totalMilliseconds % 60000) / 1000);
  const ms = totalMilliseconds % 1000;

  hours = h;
  minutes = m;
  seconds = s;
  milliseconds = ms;

  updateDisplay(hours, minutes, seconds, milliseconds);
  timerInterval = requestAnimationFrame(updateTimer);
}

function updateDisplay(hours, minutes, seconds, milliseconds) {
  hoursEl.innerHTML = formatTime(hours);
  minutesEl.innerHTML = formatTime(minutes);
  secondsEl.innerHTML = formatTime(seconds);
  millisecondsEl.innerHTML = formatMilliseconds(milliseconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function formatMilliseconds(time) {
  return time < 100 ? `0${time}`.padStart(3, "0") : time;
}

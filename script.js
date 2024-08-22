let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let lapCounter = 1;
let intervalId;

const display = document.getElementById('display');
const lapTimes = document.getElementById('lapTimes');

function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10); // Update every 10 milliseconds
    isRunning = true;
  }
}

function pauseStopwatch() {
  clearInterval(intervalId);
  isRunning = false;
}

function resetStopwatch() {
  clearInterval(intervalId);
  isRunning = false;
  elapsedTime = 0;
  lapCounter = 1;
  display.innerText = '00:00:00:00';
  lapTimes.innerHTML = '';
}

function recordLap(event) {
  event.stopPropagation();
  const lapTime = timeToString(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
  lapTimes.appendChild(lapItem);
  lapCounter++;
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.innerText = timeToString(elapsedTime);
}

function timeToString(time) {
  const diffInHrs = time / 3600000;
  const hh = Math.floor(diffInHrs);

  const diffInMin = (diffInHrs - hh) * 60;
  const mm = Math.floor(diffInMin);

  const diffInSec = (diffInMin - mm) * 60;
  const ss = Math.floor(diffInSec);

  const diffInMs = (diffInSec - ss) * 100;
  const ms = Math.floor(diffInMs);

  const formattedHH = hh.toString().padStart(2, '0');
  const formattedMM = mm.toString().padStart(2, '0');
  const formattedSS = ss.toString().padStart(2, '0');
  const formattedMS = ms.toString().padStart(2, '0');

  return `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Event listeners
document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', recordLap);
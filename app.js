
const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const setBtn = document.querySelector(".btn-set");
const minuteDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");
const minuteInput = document.querySelector(".input-minutes");
const secondInput = document.querySelector(".input-seconds");

let myInterval = null;
let isRunning = false;
let totalSeconds = 0;

const getDisplayedSeconds = () => {
  const minutesText = minuteDiv?.textContent ?? "0";
  const secondsText = secondDiv?.textContent ?? "0";
  const minutes = Math.max(0, parseInt(minutesText, 10) || 0);
  const seconds = Math.min(59, Math.max(0, parseInt(secondsText, 10) || 0));
  return minutes * 60 + seconds;
};

const renderTime = (seconds) => {
  const minutesLeft = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  minuteDiv.textContent = minutesLeft;
  secondDiv.textContent = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
};

const setFromInputs = () => {
  if (!minuteInput || !secondInput) {
    totalSeconds = getDisplayedSeconds();
    renderTime(totalSeconds);
    return;
  }
  const minutes = Math.max(0, parseInt(minuteInput.value || "0", 10));
  const seconds = Math.min(59, Math.max(0, parseInt(secondInput.value || "0", 10)));
  totalSeconds = minutes * 60 + seconds;
  renderTime(totalSeconds);
};

const startTimer = () => {
  if (isRunning) return;

  if (totalSeconds === 0) {
    setFromInputs();
  }

  if (totalSeconds === 0) return;

  isRunning = true;
  myInterval = setInterval(() => {
    totalSeconds--;
    renderTime(totalSeconds);

    if (totalSeconds <= 0) {
      bells.play();
      clearInterval(myInterval);
      isRunning = false;
      totalSeconds = 0;
      renderTime(0);
    }
  }, 1000);
};

const pauseTimer = () => {
  if (!isRunning) return;
  clearInterval(myInterval);
  isRunning = false;
};

startBtn?.addEventListener("click", startTimer);
pauseBtn?.addEventListener("click", pauseTimer);
setBtn?.addEventListener("click", () => {
  if (isRunning) return;
  setFromInputs();
});

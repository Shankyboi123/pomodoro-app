
const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start"); 
const minuteDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");

let myInterval = null;
let isRunning = false;
let totalSeconds = 0;

const appTimer = () => {

  // ▶️ START
  if (!isRunning) {
    isRunning = true;
    startBtn.textContent = "Pause";

    if (totalSeconds === 0) {
      totalSeconds = parseInt(minuteDiv.textContent) * 60;
    }

    myInterval = setInterval(() => {
      totalSeconds--;

      let minutesLeft = Math.floor(totalSeconds / 60);
      let secondsLeft = totalSeconds % 60;

      minuteDiv.textContent = minutesLeft;
      secondDiv.textContent = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;

      if (totalSeconds <= 0) {
        bells.play();
        clearInterval(myInterval);
        isRunning = false;
        startBtn.textContent = "start";
        totalSeconds = 0;
      }
    }, 1000);

  } 
  // ⏸️ PAUSE
  else {
    clearInterval(myInterval);   // ← THIS is pausing
    isRunning = false;
    startBtn.textContent = "start";
  }
};

startBtn.addEventListener("click", appTimer);



startBtn.addEventListener("click", appTimer);




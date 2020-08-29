// display variables
var hours   = 0;
var minutes = 0;
var seconds = 0;

// store page elements
mainBtn  = document.querySelector('#start-stop-resume');
resetBtn = document.querySelector('#reset');
display  = document.querySelector('#display');

// link handlers for button text changes and timer start-stop
mainBtn.addEventListener('click', handleMainBtnClick);
resetBtn.addEventListener('click', resetApp);

/* zero padding utility for display output: zeroPad(5, 4) returns '0005' */
const zeroPad = (num, places) => String(num).padStart(places, '0')

function handleMainBtnClick(e) {
  /* callback tied to main button click */
  switch (mainBtn.classList[0]) {
    case 'start':
      // initial state to timing state
      mainBtn.classList = ['stop'];
      mainBtn.innerText = 'Stop';
      resetBtn.disabled = true;
      mySession = setInterval(incrementTimer, 1000);
      break;
    case 'stop':
      // timing state to paused state
      mainBtn.classList = ['resume'];
      mainBtn.innerText = 'Resume';
      resetBtn.disabled = false;
      clearTimeout(mySession);
      break;
    case 'resume':
      // paused state to timing state
      mainBtn.classList = ['stop'];
      mainBtn.innerText = 'Stop';
      resetBtn.disabled = true;
      mySession = setInterval(incrementTimer, 1000);
      break;
  }
}

function resetApp(e) {
  /* callback tied to reset button click */
  hours   = 0;
  minutes = 0;
  seconds = 0;
  updateDisplay();

  mainBtn.classList = ['start'];
  mainBtn.innerText = 'Start';
  resetBtn.disabled = true;
}

function incrementTimer() {
  /* updates the timer variables and display */
  seconds++;

  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }

  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }

  if (hours >= 100) {
    hours = 0;
  }

  updateDisplay();
}

function updateDisplay() {
  /* makes the display match the timer variables */
  display.innerText = `${ zeroPad(hours, 2) }:${ zeroPad(minutes, 2) }:${ zeroPad(seconds, 2)}`;
}

let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const custom = document.getElementById('custom');

function timer(seconds) {
    clearInterval(countdown); // if timer exists, it will clear fo us
    const now = Date.now();
    const then = now + seconds * 1000; // to milliseconds
    displayTimeLeft(seconds); // so it will run once before the initial one second interval delay
    displayEndTime(then);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now())/ 1000) // to seconds
        //check if we should stop it
        secondsLeft < 0 ? clearInterval(countdown) :        // if count is less than 0, stop the count
        //display it
        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60); // getting the lower bound of number
    const remainderSeconds = seconds % 60;
    const display = `${minutes}: ${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timeStamp) {
    const end = new Date(timeStamp);
    let hour = end.getHours();
    hour > 12 ? (hour = hour - 12) : hour ;
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour}: ${minutes < 10 ? 0 : ''}${minutes}`;
}

function startTimer() {
    timer(this.dataset.time);
}

buttons.forEach(button => {
    button.addEventListener('click', startTimer);
})
document.customForm.addEventListener('submit', function(e) { //we can call custom form directly since that is has a name property
    e.preventDefault();
    const mins = this.minutes.value;
    seconds = mins * 60;
    timer(seconds);
    this.reset();

})


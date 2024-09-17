let timer;
let isRunning = false;
let elapsedTime = 0;
let lapCounter = 0;

function timeToString(time) {
    let date = new Date(time);
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function startTimer() {
    let startTime = Date.now() - elapsedTime;
    timer = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        document.getElementById('display').textContent = timeToString(elapsedTime);
    }, 10);
    isRunning = true;
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    elapsedTime = 0;
    lapCounter = 0;
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('laps').innerHTML = '';
    isRunning = false;
}

function addLap() {
    if (isRunning) {
        lapCounter++;
        let lapTime = timeToString(elapsedTime);
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapItem.className = 'list-group-item';
        document.getElementById('laps').appendChild(lapItem);
    }
}

document.getElementById('start').addEventListener('click', function () {
    if (!isRunning) {
        startTimer();
    }
});

document.getElementById('pause').addEventListener('click', function () {
    if (isRunning) {
        pauseTimer();
    }
});

document.getElementById('reset').addEventListener('click', function () {
    resetTimer();
});

document.getElementById('lap').addEventListener('click', function () {
    addLap();
});

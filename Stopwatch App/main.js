const btnPlay = document.getElementById('play');
const btnStop = document.getElementById('stop');
const btnUndo = document.getElementById('undo');
const time = document.getElementById('logged-time');

let hour = 0;
let minute = 0;
let second = 0;
let timer;

btnPlay.addEventListener('click', playTimer);
btnStop.addEventListener('click', pauseTimer)
btnUndo.addEventListener('click', resetTimer)

function playTimer() {
    createStartMsg();
    btnPlay.disabled = true;
    timer = setInterval(() => {
        second++;
        updateMinuteAndHour();
        const newTime = `${formatTimeUnit(hour)}:${formatTimeUnit(minute)}:${formatTimeUnit(second)}`;
        if (time.textContent !== newTime) {
            time.textContent = newTime;
        }
    }, 1000);

}

function pauseTimer() {
    if(timer) {
        clearInterval(timer);
        btnPlay.disabled = false;    
    }
}

function resetTimer() {
    pauseTimer();
    second = 0;
    minute = 0;
    hour = 0;
    time.textContent = "00:00:00";
}

function formatTimeUnit(unit) {
    return unit < 10 ? "0" + unit : unit;
}

function updateMinuteAndHour() {
    if(second === 60) {
        second = 0;
        minute += 1;
    }
    if(minute === 60) {
        minute = 0;
        hour +=1
    }
}

function createStartMsg() {
    let myMsg = document.createElement('div');
    myMsg.textContent = "Time Started!";
    myMsg.classList.add('start-msg');

    setTimeout(() => {
        myMsg.remove();
    }, 2000);

    document.body.appendChild(myMsg);
}

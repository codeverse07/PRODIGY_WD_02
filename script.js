

window.onload = function () {
    let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
    let display = document.getElementById("display");
    let interval = null;
    let running = false;

    document.getElementById("start").addEventListener("click", startTimer);
    document.getElementById("pause").addEventListener("click", pauseTimer);
    document.getElementById("reset").addEventListener("click", resetTimer);
    document.getElementById("lap").addEventListener("click", recordLap);
    document.getElementById("resume").addEventListener("click", resumeTimer);
    document.getElementById("stop").addEventListener("click", stopTimer);

    function startTimer() {
        if (!running) {
            running = true;
            interval = setInterval(updateDisplay, 10);
        }
    }

    function pauseTimer() {
        clearInterval(interval);
        running = false;
    }

    function resumeTimer() {
        if (!running) {
            startTimer();
        }
    }

    function stopTimer() {
        clearInterval(interval);
        running = false;
        [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
        display.innerHTML = "00:00:00:00";
        document.getElementById("laps").innerHTML = "";
    }

    function resetTimer() {
        clearInterval(interval);
        running = false;
        [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
        display.innerHTML = "00:00:00:00";
    }

    function recordLap() {
        let laps = document.getElementById("laps");
        let lapItem = document.createElement("li");
        lapItem.innerText = display.innerHTML;
        laps.appendChild(lapItem);
    }

    function updateDisplay() {
        milliseconds += 10;
        if (milliseconds >= 1000) {
            milliseconds = 0;
            seconds++;
            if (seconds == 60) {
                seconds = 0;
                minutes++;
                if (minutes == 60) {
                    minutes = 0;
                    hours++;
                }
            }
        }
        let h = hours < 10 ? "0" + hours : hours;
        let m = minutes < 10 ? "0" + minutes : minutes;
        let s = seconds < 10 ? "0" + seconds : seconds;
        let ms = (milliseconds / 10).toFixed(0).padStart(2, '0');
        display.innerHTML = `${h}:${m}:${s}:${ms}`;
    }
};
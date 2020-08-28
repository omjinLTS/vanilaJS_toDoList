const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector(".js-time");

function digit(time) {
    return time>9?time:`0${time}`
}

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${digit(hours)}:${digit(minutes)}:${digit(seconds)}`
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();
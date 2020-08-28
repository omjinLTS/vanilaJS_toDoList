const form = document.querySelector(".js-form"),
  input = form.querySelector("input");
  gretting = document.querySelector(".js-gretting");
  resetBtn = document.querySelector(".js-reset"); 

const USER_LS = "currnetUser",
  SHOWING_CN = "showing";

function handleReset(event) {
    localStorage.removeItem(USER_LS);
    gretting.classList.remove(SHOWING_CN);
    loadName();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    localStorage.setItem(USER_LS, currentValue);
    paintGretting(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGretting(text) {
    form.classList.remove(SHOWING_CN);
    gretting.classList.add(SHOWING_CN);
    gretting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else {
        paintGretting(currentUser);
    }
}

function init() {
    loadName();
    resetBtn.addEventListener("click", handleReset);
}

init();
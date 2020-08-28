const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    resetBtn = document.querySelector(".js-reset");

const TODOS_LS ="toDos";
let toDos = [];

function handleReset(event) {
    toDoList.replaceWith("");
    toDos = [];
    saveToDos();
    window.location.reload();
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    if(text !== "") {
        const li = document.createElement("li");
        const delBtn = document.createElement("button");
        const span = document.createElement("span");
        const newId = toDos.length + 1;

        delBtn.innerText = "x";
        delBtn.addEventListener("click", deleteToDo);

        span.innerText = text;
        li.appendChild(delBtn);
        li.appendChild(span);
        li.id = newId;
        toDoList.appendChild(li);

        const toDoObj ={
            text: text,
            id: newId,
        };
        toDos.push(toDoObj);
        saveToDos();
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const currnetValue = toDoInput.value;
    toDoInput.value = "";
    paintToDo(currnetValue);
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){paintToDo(toDo.text);});
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
    resetBtn.addEventListener("click", handleReset);
}

init();
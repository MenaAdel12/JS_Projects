let isFirstTimeLodaded = true;

const inputField = document.querySelector(".row input");
const btnField = document.querySelector(".row button");
const listTasks = document.querySelector(".todo-app ul");
const removeBtn = document.querySelector("ul li span");

let tasksInJS = [];

window.onload = function () {
  tasksInJS = JSON.parse(window.localStorage.getItem("allTasks")) || [];
  showTasks();
  isFirstTimeLodaded = false;
};

function addOneTask(task, isChecked = false) {
  if (isTaskExist(task) && !isFirstTimeLodaded) {
    alert("This Task Already Exists!");
    return;
  }

  let myTask = document.createElement("li");
  myTask.textContent = task;

  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  myTask.appendChild(span);

  if (isChecked) myTask.classList.add("checked");

  myTask.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      myTask.classList.toggle("checked");
      saveCheckState(myTask);
    } else if (e.target.tagName === "SPAN") {
      myTask.remove();
      removeTask(myTask.textContent.slice(0, -1));
    }
  });

  listTasks.appendChild(myTask);

  tasksInJS.push({
    task: myTask.textContent.slice(0, -1), // to delete last span's icon
    checkState: isChecked,
  });
  UpdateLocalStorage();
  reseteInput();
}

function saveCheckState(task) {
  for (var i = 0; i < tasksInJS.length; i++) {
    if (tasksInJS[i].task === task.textContent.slice(0, -1)) {
      if (task.classList.contains("checked"))
        tasksInJS[i].checkState = true; // checked
      else tasksInJS[i].checkState = false;

      break;
    }
  }

  UpdateLocalStorage();
}

function removeTask(removedTask) {
  let tempTasks = tasksInJS;

  for (var i = 0; i < tempTasks.length; i++) {
    if (tempTasks[i].task === removedTask) {
      tempTasks.splice(i, 1);
      break;
    }
  }

  tasksInJS = tempTasks;
  UpdateLocalStorage();
}

function showTasks() {
  let tempTasks = tasksInJS;
  tasksInJS = []; // resete

  for (var i = 0; i < tempTasks.length; i++) {
    addOneTask(tempTasks[i].task, tempTasks[i].checkState);
  }
}

function UpdateLocalStorage() {
  window.localStorage.setItem("allTasks", JSON.stringify(tasksInJS));
}

btnField.addEventListener("click", () => {
  let task = inputField.value;

  if (task === "") {
    alert("You must write anything!");
    return;
  }
  addOneTask(task);
});

function reseteInput() {
  inputField.value = null;
}

inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") btnField.click();
});

function isTaskExist(task) {
  return tasksInJS.some((obj) => obj.task === task);
}

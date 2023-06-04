const tasksContainer = document.querySelector("#taskConatiner") // Where the tasks will be displayed
const addTaskForm = document.querySelector("#add-task") // Form to add a new task

const taskList = []; // Array to store the tasks

class Task {
    title = "";
    date = new Date();
    priority = 0;
    done = false;
    constructor(title, priority, done=false, date=new Date()) {
        this.title = title;
        this.priority = priority;
        this.done = done;
        this.date = date;
    }
}

addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let title = String(document.querySelector("#title").value);
    let priority = Number(document.querySelector("#priority").value);
    let task = new Task(title, priority);
    taskList.push(task);
    displayTask(task);
});

function displayTask(task) {
    let li = document.createElement("li");
    let left = document.createElement("div");
    let right = document.createElement("div");
    let title = document.createElement("h4");
    let info = document.createElement("span");
    let remove = document.createElement("button");
    let edit = document.createElement("button");
    let save = document.createElement("button");
    let editTitle = document.createElement("input");
    let editPriority = document.createElement("input");

    title.classList.add("taskTitle");
    info.classList.add("taskinfo");
    remove.classList.add("btn-delete");
    edit.classList.add("btn-primary");
    editTitle.classList.add("input");
    editPriority.classList.add("input");
    save.classList.add("btn-primary");

    title.innerText = task.title;
    info.innerText = `${task.date.toLocaleDateString()} ${task.date.toLocaleTimeString()} - Priority ${task.priority}`;
    remove.innerText = "Remove";
    edit.innerText = "Edit";
    save.innerText = "Save";
    editTitle.value = task.title;
    editPriority.value = task.priority;

    editTitle.style.display = "none";
    editPriority.style.display = "none";
    save.style.display = "none";


    left.appendChild(title);
    left.appendChild(info);
    left.appendChild(editTitle);
    left.appendChild(editPriority);

    right.appendChild(remove);
    right.appendChild(edit);
    right.appendChild(save);

    li.appendChild(left);
    li.appendChild(right);

    tasksContainer.appendChild(li);
    remove.addEventListener("click", () => {
        li.remove();
        taskList.splice(taskList.indexOf(task), 1);
    });

    edit.addEventListener("click", () => {
        title.style.display = "none";
        info.style.display = "none";
        editTitle.style.display = "block";
        editPriority.style.display = "block";
        save.style.display = "inline-block";
        edit.style.display = "none";
    });

    save.addEventListener("click", () => {
        task.title = editTitle.value;
        task.priority = Number(editPriority.value);
        title.innerText = task.title;
        info.innerText = `${task.date.toLocaleDateString()} ${task.date.toLocaleTimeString()} - Priority ${task.priority}`;
        title.style.display = "block";
        info.style.display = "block";
        editTitle.style.display = "none";
        editPriority.style.display = "none";
        save.style.display = "none";
        edit.style.display = "inline-block";
    });
}

function displayTasks() {
    tasksContainer.innerHTML = '';
    taskList.forEach((task) => {
        displayTask(task);
    });
}


const sortSelect = document.querySelector("#sort");
sortSelect.addEventListener("change", (e) => {
    let value = e.target.value;
    console.log(value);
    if (value == "priority") {
        taskList.sort((a, b) => {
            return a.priority - b.priority;
        });
    } else if (value == "date") {
        taskList.sort((a, b) => {
            return a.date - b.date;
        });
    } else if (value == "title") {
        taskList.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
    } else {
        console.log("Invalid value")
    }
    displayTasks();
});
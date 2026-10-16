const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");
const message = document.getElementById("message");

// Tasks are stored only in this JavaScript array.
let tasks = [];

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = "task-item";

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.dataset.index = index;
        deleteButton.setAttribute("aria-label", "Delete " + task);

        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });

    taskCount.textContent =
        tasks.length + (tasks.length === 1 ? " task" : " tasks");

    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";
}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newTask = taskInput.value.trim();

    if (newTask === "") {
        message.textContent = "Please enter a task.";
        return;
    }

    tasks.push(newTask);
    taskInput.value = "";
    message.textContent = "";
    renderTasks();
    taskInput.focus();
});

// Event delegation: one listener handles all Delete buttons.
taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        const index = Number(event.target.dataset.index);

        tasks.splice(index, 1);
        message.textContent = "Task deleted.";
        renderTasks();
    }
});

// Display the initially empty list.
renderTasks();

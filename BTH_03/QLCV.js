let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let editIndex = -1;
function saveTasks() { 
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var taskList = document.getElementById("taskList");

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    if (tasks.length === 0) {
        list.innerHTML = "<p>Chưa có công việc!</p>";
        updateStats();
        return;
    }

    tasks.forEach((task, index) => {
        list.innerHTML += `
        <div class="card priority-${task.priority}">
            <h3 class="${task.completed ? "done" : ""}">${task.title}</h3>
            <p>${task.description}</p>
            <p>
                📌 ${
                    task.priority === "low"
                    ? "Ưu tiên thấp"
                    : task.priority === "medium"
                    ? "Ưu tiên trung bình"
                    : "Ưu tiên cao"
                }
            </p>
            <p>📅 ${task.deadline}</p>
            <div class="card-top">
                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleStatus(${index})"
                >

                <div class="card-actions">
                    <button
                        class="btn-edit"
                        onclick="editTask(${index})"
                    >
                        Sửa
                    </button>
                    <button
                        class="btn-delete"
                        onclick="deleteTask(${index})"
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
        `;
    });
    updateStats();
}

function updateStats() {
    const total = tasks.length;
    const done = tasks.filter(t => t.completed).length;
    const pending = total - done;

    document.getElementById("totalTasks").innerText = total;
    document.getElementById("completedTasks").innerText = done;
    document.getElementById("pendingTasks").innerText = pending;
}

document.getElementById("btnAdd").addEventListener("click", openFormAdd);

function openFormAdd() {
    editIndex = -1;
    document.getElementById("taskForm").reset();
    document.getElementById("modalTitle").innerText = "Thêm công việc";
    document.getElementById("modal").style.display = "flex";
}

function closeForm() {
    document.getElementById("modal").style.display = "none";
}

document.getElementById("closeModalBtn").addEventListener("click", closeForm);

document.getElementById("cancelBtn").addEventListener("click", closeForm);

document.getElementById("taskForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const task = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        deadline: document.getElementById("deadline").value,
        completed: false
    };

    if (editIndex === -1) {
        tasks.push(task);
    } else {
        tasks[editIndex] = task;
        editIndex = -1;
    }

    saveTasks();
    renderTasks();
    closeForm();
});

function editTask(index) {
    const t = tasks[index];

    document.getElementById("title").value = t.title;
    document.getElementById("description").value = t.description;
    document.getElementById("priority").value = t.priority;
    document.getElementById("deadline").value = t.deadline;

    editIndex = index;

    document.getElementById("modalTitle").innerText = "Cập nhật công việc";
    document.getElementById("modal").style.display = "flex";
}

function toggleStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

renderTasks();
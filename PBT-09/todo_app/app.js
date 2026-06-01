const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const count = document.getElementById("count");
const clearCompletedBtn = document.getElementById("clearCompleted");
const filterBtns = document.querySelectorAll(".filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateCount() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    count.textContent = `${activeCount} items left`;
}

function renderTodos() {
    todoList.innerHTML = "";
    let filteredTodos = todos;
    if (currentFilter === "active") {
        filteredTodos = todos.filter(todo => !todo.completed);
    }

    if (currentFilter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "todo-item";
        li.dataset.id = todo.id;

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;

        if (todo.completed) {
            span.classList.add("completed");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "❌";

        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
    updateCount();
    saveTodos();
}

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    todos.push({
        id: Date.now(),
        text,
        completed: false
    });
    todoInput.value = "";
    renderTodos();
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

todoList.addEventListener("click", (e) => {
    const li = e.target.closest(".todo-item");
    if (!li) return;

    const id = Number(li.dataset.id);

    if (e.target.classList.contains("delete-btn")) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
        return;
    }

    if (e.target.classList.contains("todo-text")) {
        const todo = todos.find(todo => todo.id === id);
        todo.completed = !todo.completed;
        renderTodos();
    }
});

todoList.addEventListener("dblclick", (e) => {
    if (!e.target.classList.contains("todo-text")) return;

    const span = e.target;
    const li = span.closest(".todo-item");
    const id = Number(li.dataset.id);

    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.className = "edit-input";

    li.replaceChild(input, span);

    input.focus();

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const todo = todos.find(todo => todo.id === id);
            const newText = input.value.trim();
            if (newText) {
                todo.text = newText;
            }
            renderTodos();
        }
    });
});

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
});

renderTodos();
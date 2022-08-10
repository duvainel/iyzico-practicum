const todoList = document.getElementById("todo-list");

// Add todos in localstorage if doesn't exist
let todos = JSON.parse(localStorage.getItem("todos"));
if (localStorage.getItem("todos") === null) {
  localStorage.setItem("todos", JSON.stringify([]));
}

// Render todo items
function renderTodos() {
  if (!todos) return;
  todoList.innerHTML = "";
  todos.map((todo, index) => {
    todoList.innerHTML += `
    <li class="js-todo ${todo.isCompleted ? "done" : ""}" data-index=${index}>
      <span>${todo.title}</span>
      <img class="js-delete" src="./assets/delete-icon.svg" alt="delete" />
    </li>
    `;
  });
}

// Get task input & create button
const taskInput = document.getElementById("task");
const createButton = document.getElementById("createButton");

function createTodo() {
  const todo = taskInput.value;
  // Show error if input is empty
  if (!todo) {
    $("#errorToast").toast("show");
    return;
  }

  // Show succes message after adding a new todo
  $("#successToast").toast("show");
  todos.push({ title: todo, isCompleted: false });
  todoAction();
  taskInput.value = "";
}

// Create todo on click
createButton.addEventListener("click", createTodo);

// Create todo on enter
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") createTodo();
});

// Get all delete buttons
const deleteButtons = document.getElementsByClassName("js-delete");

// Delete todo by index
function deleteTodo(element) {
  const todoItem = element.parentElement;
  const todoIndex = Number(todoItem.getAttribute("data-index"));
  todos = todos.filter((todo, index) => {
    if (index !== todoIndex) return todo;
  });
  todoAction();
}

// Bind delete listeners
function bindDeleteEvents() {
  Array.from(deleteButtons).forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteTodo(deleteButton);
    });
  });
}

// Get all todos
const todoItems = document.getElementsByClassName("js-todo");

// Toggle todo complete state
function toggleTodo(element) {
  if (!todos) return;
  const todoIndex = element.getAttribute("data-index");
  todos[todoIndex].isCompleted = !todos[todoIndex].isCompleted;
  todoAction();
}

// Bind toggle listeners
function bindToggleEvents() {
  Array.from(todoItems).forEach((todoItem) => {
    todoItem.addEventListener("click", () => {
      toggleTodo(todoItem);
    });
  });
}

// Sync UI with state after every action
function todoAction() {
  renderTodos();
  bindDeleteEvents();
  bindToggleEvents();
  localStorage.setItem("todos", JSON.stringify(todos));
}

todoAction();

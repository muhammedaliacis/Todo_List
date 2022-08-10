const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstcardBody = document.querySelectorAll(".card-body")[0];
const secondcardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
const onswitchh = document.querySelector(".btn-group");


eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondcardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", cleartodo);
    onswitchh.addEventListener("click", darkcolor);

}

function darkcolor(e) {
    const bodyy = document.querySelector("body");
    if (e.target.className === "btn btn-success")
        bodyy.setAttribute("style", "background-color: black;");
    if (e.target.className === "btn btn-light")
        bodyy.setAttribute("style", "background-color: white;");

}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listitems = document.querySelectorAll(".list-group-item");

    listitems.forEach(function(list) {
        const text = list.textContent.toLocaleLowerCase();
        if (text.indexOf(filterValue) === -1) {
            list.setAttribute("style", "display : none !important");
        } else {
            list.setAttribute("style", "display : block");

        }
    })
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();
    // let todos = [];

    // todos = getTodosFromStorage();
    // todos.forEach(function(todo){
    // 	if (newTodo === todo){
    // 		showAlert("danger","Zaten bÃ¶yle bir todo girdiniz.");
    // 		return 0;
    // 	}
    // })

    if (newTodo === "") {
        showAlert("danger", "Please, enter a todo.")
    } else {
        showAlert("success", "Todo added successfully.")
        addTodoToUI(newTodo);
        addTodotoUIStorage(newTodo);
    }


    e.preventDefault();
}

function addTodoToUI(newtodo) {
    const ul = document.querySelector("ul");
    const liste = document.createElement("li");
    const link = document.createElement("a");
    const symbol = document.createElement("i");
    const symbol2 = document.createElement("span");


    liste.className = "list-group-item d-flex justify-content-between";
    liste.textContent = newtodo;
    link.className = "delete-item";
    link.href = "#";
    symbol.className = "fa fa-remove";
    symbol2.className = "glyphicon glyphicon-ok";
    symbol2.setAttribute("style", "padding-left: 10px;")


    ul.appendChild(liste);
    liste.appendChild(link);
    link.appendChild(symbol);
    link.appendChild(symbol2);
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success", "Deletion successful.");
    }
    if (e.target.className === "glyphicon glyphicon-ok") {
        e.target.parentElement.parentElement.setAttribute("style", "background-color: #F8C471; color: white;");
    }
}

function deleteStorage(todo) {
    let todos = getTodosFromStorage();

    todos.forEach(function(tod, index) {
        if (tod === todo) {
            todos.splice(index, 1);
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));

}

function getTodosFromStorage() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}


function addTodotoUIStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function(todo) {
        addTodoToUI(todo);
    })
}

function showAlert(type, message) {
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstcardBody.appendChild(alert);

    setTimeout(function() {
        alert.remove();
    }, 1500);
}


function cleartodo(e) {
    if (confirm("Are you sure you want to delete all ?")) {
        //todo8List.innerHTML = "";
        while (todoList.firstElementChild) {
            todoList.removeChild(todoList.firstElementChild);
        }
    }
    localStorage.removeItem("todos");
}
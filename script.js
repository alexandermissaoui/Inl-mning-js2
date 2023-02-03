const todoList = document.getElementById("todoList");
const listItem = document.createElement("li");
const submitBtn = document.querySelector("#addtodo");
const todoInput = document.querySelector("#todoInput")
const clearText = document.querySelector('.todoInput');
const errorMessage = document.querySelector("#errorMessage");
const toDoArray= []
const id = toDoArray.length +1
let BASE_URL = "https://jsonplaceholder.typicode.com/todos/";
// Fetch get todos
  window.onload = function() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=7')
      .then(response => response.json())
      .then(todos => {
        // Get the todo list element
        const todoList = document.getElementById("todoList");
        todos.forEach(todo => {
          toDoArray.push(todo)
        })
        console.log(toDoArray)
        // Iterate through the todos and add them to the list
        for (let i = 0; i < todos.length; i++) {
          let todo = todos[i];
          let listItem = document.createElement("li");
          listItem.innerText = todo.title;
          listItem.setAttribute("data-id", todo.id);
          listItem.innerHTML += ' <button onclick="removeTodo(this)">Remove</button>';
          todoList.appendChild(listItem);
       }
    });
  }
// Remove todo
  function removeTodo(element) {
    const todoId = element.parentNode.getAttribute("data-id");
    fetch(BASE_URL + todoId, {
      method: 'DELETE'
    }).then(response => {
        if (response.ok) {
          console.log(response)
          const index = toDoArray.indexOf(todoId => todoId == index)
          toDoArray.splice(index, 1)
            element.parentNode.remove();
        }
        else {
          console.log("Fetch failed")
        }
    });
  }
  // Validation no empty todo
  function addTodo(e) {
    e.preventDefault()
    const todoInput = document.getElementById("todoInput").value;
    if (todoInput.trim() === "") {
      errorMessage.classList.remove('d-none');
      return 
    }
    errorMessage.classList.add('d-none');
  // Send to API
      const newTodo = {
        userId: 11,
        title: todoInput,
        completed: false,
    }
  // Add to the list
    let listItem = document.createElement("li");
    listItem.innerText = todoInput;
    listItem.innerHTML += ' <button onclick="removeTodo(this)">Remove</button>';
    todoList.appendChild(listItem);
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => {
    toDoArray.push(json)
    console.log(toDoArray)
    console.log(json)
    console.log("clear text")
    clearText.value = "";
  })
}
  submitBtn.addEventListener('click', addTodo)
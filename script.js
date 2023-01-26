
  window.onload = function() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(todos => {
        // Get the todo list element
        var todoList = document.getElementById("todoList");

        // Iterate through the todos and add them to the list
        for (var i = 0; i < todos.length; i++) {
          var todo = todos[i];
          var listItem = document.createElement("li");
          listItem.innerText = todo.title;
          listItem.setAttribute("data-id", todo.id);
          listItem.innerHTML += ' <button onclick="removeTodo(this)">Remove</button>';
          todoList.appendChild(listItem);
        }
      });
  }

  fetch('https://jsonplaceholder.typicode.com/todos', {
  method: 'POST',
  body: JSON.stringify({
    title: 'New Todo',
    completed: false
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
.then(response => response.json())
.then(json => console.log(json))


  function addTodo() {
    var todoInput = document.getElementById("todoInput").value;
    var errorMessage = document.getElementById("errorMessage");
    if (!todoInput) {
      errorMessage.innerText = "Please enter a todo";
    } else {
      // Add the todo to the server
      fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({ title: todoInput, completed: false }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => response.json())
        .then(todo => {
          // Add the todo to the list
          var todoList = document.getElementById("todoList");
          var listItem = document.createElement("li");
          listItem.innerText = todo.title;
          listItem.setAttribute("data-id", todo.id);
          listItem.innerHTML += ' <button onclick="removeTodo(this)">Remove</button>';
          todoList.appendChild(listItem);

          errorMessage.innerText = "";
          document.getElementById("todoInput").value = "";
        });
    }
  }
  
  function removeTodo(element) {
    var todoId = element.parentNode.getAttribute("data-id");
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
      method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            element.parentNode.remove();
        }
    });
  }

  function addTodo() {
    var todoInput = document.getElementById("todoInput").value;
    if (todoInput.trim() === "") {
      alert("Du kan inte lägga till en tom todo!");
    } else {
      // Lägg till todo i listan
    }
  }

  

  

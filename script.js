var todoList = document.getElementById("todoList");
var listItem = document.createElement("li");
const submitBtn = document.querySelector("#addtodo");
const todoInput = document.querySelector("#todoInput")
const toDoArray= []
const id = toDoArray.length +1


// Fetch hämta todos
  window.onload = function() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=7')
      .then(response => response.json())
      .then(todos => {
        // Get the todo list element
        var todoList = document.getElementById("todoList");
        todos.forEach(todo => {
          toDoArray.push(todo)
        })
        console.log(toDoArray)

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

  // function getTodo() {
  //   var todoInput = document.getElementById("todoInput").value;
  //   var errorMessage = document.getElementById("errorMessage");
  //   if (!todoInput) {
  //     errorMessage.innerText = "Please enter a todo";
  //   } else {

//       // Add the todo to the server
//       const newTodo = {
//         userId: 11,
//         id: id,
//         title: todoInput.value,
//         completed: false,
//     }

//     fetch(BASE_URL, {
//         method: 'POST',
//         body: JSON.stringify(newTodo),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     })
      
//       fetch('https://jsonplaceholder.typicode.com/todos', {
//         method: 'POST',
//         body: JSON.stringify(newTodo),
//         headers: {
//           'Content-type': 'application/json; charset=UTF-8'
//         },
//       })
//         .then(response => response.json())
//         .then(todo => {
//           // Add the todo to the list
//          toDoArray.push(todo)
//          console.log(newTodo)

//           // listItem.innerText = todo.title;
//           // listItem.setAttribute("data-id", todo.id);
//           // listItem.innerHTML += ' <button onclick="removeTodo(this)">Remove</button>';
//           // todoList.appendChild(listItem);

//           errorMessage.innerText = "";
//           document.getElementById("todoInput").value = "";
//         });
//     }
//   }

// // submitBtn.addEventListener('click', addTodo)
  
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

  // Kan inte lägga till en tom todo
  function addTodo(e) {
    e.preventDefault()
    var todoInput = document.getElementById("todoInput").value;
    if (todoInput.trim() === "") {
      alert("Du kan inte lägga till en tom todo!");
    // } else {
      
    }
  

  // Skicka till databasen

      const newTodo = {
        userId: 11,
        id: id,
        title: todoInput.value,
        completed: false,
    }
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
    console.log(newTodo)
  })
 
  
  function validateTodo() {
    if (todoInput.value === 0 ) {
      return false;
    } else {
      return true;
    }
  }
  validateTodo()
}
  submitBtn.addEventListener('click', addTodo)
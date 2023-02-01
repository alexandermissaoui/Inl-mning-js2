const todoList = document.getElementById("todoList");
const listItem = document.createElement("li");
const submitBtn = document.querySelector("#addtodo");
const todoInput = document.querySelector("#todoInput")
const clearText = document.querySelector('.todoInput');
const errorMessage = document.querySelector("#errorMessage")
const toDoArray= []
const id = toDoArray.length +1
let BASE_URL = "https://jsonplaceholder.typicode.com/todos/";


// Fetch hämta todos
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

// // submitBtn.addEventListener('click', addTodo)
  
// remove todo
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

  // Kan inte lägga till en tom todo meddelande
  function addTodo(e) {
    e.preventDefault()
    const todoInput = document.getElementById("todoInput").value;
    if (todoInput.trim() === "") {
      // alert("Du kan inte lägga till en tom todo!");
      errorMessage.classList.remove('d-none');


      return
    // } else {  
    }
    errorMessage.classList.add('d-none');

  // Skicka till databasen

      const newTodo = {
        userId: 11,
        title: todoInput,
        completed: false,
    }

  // Lägg till i listan
    let listItem = document.createElement("li");
    listItem.innerText = todoInput;
    // listItem.setAttribute("data-id", todo.id);
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

//   För godkänt ska du göra följande:

// (Klar) Använda Fetch när sidan laddas för att hämta hem todos från databasen till en lista som sedan ska visas på sidan
// (Klar) Skapa ett formulär med en text input och en knapp där användare kan lägga till en ny todo. Denna input ska valideras så att det inte går att lägga till en tom todo.
// (Klar) När den nya todon läggs till så ska du använda fetch för att göra en POST till databasen och sedan använda ditt response för att lägga till todon i listan.
// (Klar) Det ska även skrivas ut en text som talar om för användaren vad som blivit fel om ingen text har skrivits in.
// (Klar) Det ska gå att ta bort en todo från listan och du ska även göra en DELETE mot databasen då.
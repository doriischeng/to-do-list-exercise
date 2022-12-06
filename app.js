const form = document.querySelector("form");
const input = document.querySelector("input");
const list = document.querySelector("#todo-list");

//check whether storage currently has saved items or is empty
//if empty, create an array to store my todo list
const savedTodos =
  JSON.parse(localStorage.getItem("todos")) || [];

//then to loop through the savedTodos array and display the result
for (let i = 0; i < savedTodos.length; i++) {
  let newTodo = document.createElement("li");
  newTodo.innerText = savedTodos[i].task;
  newTodo.isCompleted = savedTodos[i].isCompleted
    ? true
    : false;
  if (newTodo.isCompleted) {
    newTodo.style.textDecoration = "line-through";
  }

  list.appendChild(newTodo);
}

//to add an item to the list
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newTodo = document.createElement("li");
  const removeButton =
    document.createElement("button");
  removeButton.innerText = "X";
  newTodo.innerText = input.value;
  newTodo.isCompleted = false;
  newTodo.appendChild(removeButton);
  input.value = "";
  list.appendChild(newTodo);

  //to push newly added item into array and save it in storage
  savedTodos.push({
    task: newTodo.innerText,
    isCompleted: false,
  });
  //to convert this entire JS array into string and save in storage
  localStorage.setItem(
    "todos",
    JSON.stringify(savedTodos)
  );
});

//to remove an item from the list
list.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
  }
  //to cross out a completed item on the list
  else if (e.target.tagName === "LI") {
    e.target.classList.add("completed");
  }
  //to save above updates in storage
  localStorage.setItem(
    "todos",
    JSON.stringify(savedTodos)
  );
});

//Note for localStorage
//need to save whenever you add, complete or remove
//need to first make todo list into JS array
//then can JSON encode the data to be stored
//since localStorage only accepts key-value pair strings
//then to get out, need to JSON decode it back to JS array
//also need to display the result

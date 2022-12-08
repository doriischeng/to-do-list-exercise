const form = document.querySelector("form");
const input = document.querySelector("input");
const list = document.querySelector("#todo-list");

//when the DOM loads, retrieve the data out of the localStorage
//then select the location you want to display
//then display the entire HTML

document.addEventListener(
  "DOMContentLoaded",
  function (e) {
    const savedTodos = JSON.parse(
      localStorage.getItem("todos")
    );
    const location =
      document.querySelector("#todo-list");

    location.insertAdjacentHTML(
      "afterbegin",
      savedTodos
    );
  }
);

//to add an item to the list
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newTodo = document.createElement("li");
  const removeButton =
    document.createElement("button");
  removeButton.innerText = "X";
  newTodo.innerText = input.value;
  newTodo.appendChild(removeButton);
  list.appendChild(newTodo);

  //save in localStorage
  localStorage.setItem(
    "todos",
    JSON.stringify(list.innerHTML)
  );

  //reset the form after input
  input.value = "";
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
  //to clear the localStorage and save the above updates in storage
  localStorage.clear();
  localStorage.setItem(
    "todos",
    JSON.stringify(list.innerHTML)
  );
});

"use strict";

let todos = getSavedTodos();

//filtering according to the inputs
const filters = {
  searchText: "",
  hideCompleted: false
};

//initial rendering
renderTodos(todos, filters);

//create new todo==========Input form event listener
document.querySelector("#new-todo").addEventListener("submit", e => {
  //preventing default form behaviour
  e.preventDefault();
  //pushing the new data to the todo array
  todos.push({
    id: uuidv4(),
    text: e.target.elements.newTodo.value,
    completed: false
  });
  //save to local storage
  saveTodos(todos);
  //rerender after adding new one
  renderTodos(todos, filters);
  //wipping up the input form after submission
  e.target.elements.newTodo.value = "";
});

//Seach todo event listener
document.querySelector("#search-text").addEventListener("input", e => {
  filters.searchText = e.target.value;
  //re-renders after filtering the data
  renderTodos(todos, filters);
});

//checkbox event listener
document.querySelector("#checkbox").addEventListener("change", e => {
  // console.log(e.target.checked);
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});

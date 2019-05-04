const todos = [
  {
    text: "Order cat food",
    completed: false
  },
  {
    text: "Clean kitchen",
    completed: true
  },
  {
    text: "Buy food",
    completed: true
  },
  {
    text: "Do work",
    completed: false
  },
  {
    text: "Exercise",
    completed: true
  }
];

//filtering according to the inputs
const filters = {
  searchText: ""
};

//render todos function
const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter(todo => {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  //finding incomplete ones & render it
  const incompleteTodos = filteredTodos.filter(todo => {
    return !todo.completed;
  });

  //clearing previous rendered todos
  document.querySelector("#todos").innerHTML = "";

  //rendering the summary to the DOM
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  document.querySelector("#todos").appendChild(summary);

  //rendering the filtered elements accrding to the input search
  filteredTodos.forEach(todo => {
    const p = document.createElement("p");
    p.textContent = todo.text;
    document.querySelector("#todos").appendChild(p);
  });
};

//initial rendering
renderTodos(todos, filters);

//user interaction with button
document.querySelector("#add-todo").addEventListener("click", e => {
  console.log("Button clicked");
  e.target.textContent = "clicked";
});

//create new todo input field
document.querySelector("#new-todo").addEventListener("input", e => {
  console.log(e.target.value);
});

//Seach todo event listener
document.querySelector("#search-text").addEventListener("input", e => {
  filters.searchText = e.target.value;
  //re-renders after filtering the data
  renderTodos(todos, filters);
});

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

//Input form event listener
document.querySelector("#new-todo").addEventListener("submit", e => {
  //preventing default form behaviour
  e.preventDefault();
  //pushing the new data to the todo array
  todos.push({
    text: e.target.elements.newTodo.value,
    completed: false
  });
  //rerender after adding new one
  renderTodos(todos, filters);
  //wipping up the form after submission
  e.target.elements.newTodo.value = "";
});

//Seach todo event listener
document.querySelector("#search-text").addEventListener("input", e => {
  filters.searchText = e.target.value;
  //re-renders after filtering the data
  renderTodos(todos, filters);
});

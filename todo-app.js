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

//printing unfinished todos
const incompleteTodos = todos.filter(todo => {
  return !todo.completed;
});

const summary = document.createElement("h2");
summary.textContent = ` you have ${incompleteTodos.length} todos left`;
document.querySelector("body").appendChild(summary);

//show all the todos

todos.forEach(todo => {
  const todosText = document.createElement("p");
  todosText.textContent = todo.text;
  document.querySelector("body").appendChild(todosText);
});

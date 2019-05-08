"use strict";

//get local storage data===========================
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (error) {
    return [];
  }
};

//save todos to local storage=======================
//saving to local storage
const saveTodos = todos => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

//renderTodos function=================================
const renderTodos = (todos, filters) => {
  const todosEl = document.querySelector("#todos");
  let filteredTodos = todos.filter(todo => {
    //show all the todos
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  //filtering again for checkbox
  filteredTodos = filteredTodos.filter(todo => {
    if (filters.hideCompleted) {
      return !todo.completed;
    } else {
      return true;
    }
  });

  //finding incomplete ones to find out the total number
  const incompleteTodos = filteredTodos.filter(todo => {
    return !todo.completed;
  });

  //clearing previous rendered todos
  todosEl.innerHTML = "";
  //rendering the incompleted summary to the DOM(h2 tag)
  todosEl.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    //rendering the filtered elements accrding to the input search
    filteredTodos.forEach(todo => {
      todosEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.classList.add("empty-message");
    messageEl.textContent = "No to-do to show";
    todosEl.appendChild(messageEl);
  }
};

//removing a todo by id===================
const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => {
    return todo.id === id;
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1); //removing
  }
};

//Toggle the completed value for a given todo===============
const toggleTodo = id => {
  const todo = todos.find(todo => {
    return (todo.id = id);
  });
  if (todo) {
    // if found
    todo.completed = !todo.completed;
  }
};

//get DOM elements for every individual note==========================
const generateTodoDOM = todo => {
  //this is the container element for p and button
  const todoElement = document.createElement("label");
  const containerElement = document.createElement("div");
  const textElement = document.createElement("span");
  //setting input elements default type attribute from text to checkbox
  const checkbox = document.createElement("input");
  //remove note button
  const button = document.createElement("button");

  //configure checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerElement.appendChild(checkbox);

  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  //setup to do text
  textElement.textContent = todo.text;
  containerElement.appendChild(textElement);

  //classes for container
  todoElement.classList.add("list-item");
  containerElement.classList.add("list-item__container");
  todoElement.appendChild(containerElement);

  button.textContent = "remove";
  button.classList.add("button", "button--text");
  todoElement.appendChild(button);
  //remove note event handler
  button.addEventListener("click", e => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters); //re-rendering
  });

  return todoElement;
};

//Get the DOM elements for list summary===================
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h2");
  const plural = incompleteTodos.length <= 1 ? "" : "s";
  summary.classList.add("list-title");
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`;
  return summary;
};

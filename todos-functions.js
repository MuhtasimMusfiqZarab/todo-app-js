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
  document.querySelector("#todos").innerHTML = "";
  //rendering the incompleted summary to the DOM(h2 tag)
  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));

  //rendering the filtered elements accrding to the input search
  filteredTodos.forEach(todo => {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
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
  const todoElement = document.createElement("div");
  const textElement = document.createElement("span");

  //setting input elements default type attribute from text to checkbox
  const checkbox = document.createElement("input");

  //configure checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  todoElement.appendChild(checkbox);

  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  textElement.textContent = todo.text;
  //remove note button
  const button = document.createElement("button");
  button.textContent = "x";

  //remove note event handler
  button.addEventListener("click", e => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters); //re-rendering
  });

  //appending one after another

  todoElement.appendChild(textElement);
  todoElement.appendChild(button);

  return todoElement;
};

//Get the DOM elements for list summary===================
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};

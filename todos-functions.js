//get local storage data
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

//save todos to local storage=======================
//saving to local storage
const saveTodos = todos => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

//renderTodos function==============================
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

//get DOM elements for every individual note
const generateTodoDOM = todo => {
  const p = document.createElement("p");
  p.textContent = todo.text;
  return p;
};

//Get the DOM elements for list summary
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};

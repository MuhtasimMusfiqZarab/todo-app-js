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

//user interaction with button

document.querySelector("#add-todo").addEventListener("click", e => {
  console.log("Button clicked");
  e.target.textContent = "clicked";
});

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do"); //This line links the var with the id #tasks-to-do

var createTaskHandler = function(event) { //event is a way to target something happening on the page
  event.preventDefault(); //preventDefault in this case prevents the submit event from reloading the page automatically
    
    var listItemEl = document.createElement("li"); // this creates an li element with the name listItemEl
    listItemEl.className = "task-item"; //This line targets/assigns the class task-item to the var, in this case styling the created li
    listItemEl.textContent = "This is a new task."; //This line determines what text the created li should contain
    tasksToDoEl.appendChild(listItemEl); //this line makes new li a child of a different var
};
formEl.addEventListener("submit", createTaskHandler); //submit listens for a click event of a button with the type attribute of submit, or Enter being pressed on the keyboard 
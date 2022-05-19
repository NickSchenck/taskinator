var buttonEl = document.querySelector("#save-task");
console.log(buttonEl);
var tasksToDoEl = document.querySelector("#tasks-to-do"); //This line links the var with the id #tasks-to-do

var createTaskHandler = function(){
    var listItemEl = document.createElement("li"); // this creates an li element with the name listItemEl
    listItemEl.className = "task-item"; //This line targets/assigns the class task-item to the var, in this case styling the created li
    listItemEl.textContent = "This is a new task."; //This line determines what text the created li should contain
    tasksToDoEl.appendChild(listItemEl); //this line makes new li a child of a different var
};
buttonEl.addEventListener("click", createTaskHandler);
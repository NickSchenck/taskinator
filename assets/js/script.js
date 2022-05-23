var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do"); //This line links the var with the id #tasks-to-do

var createTaskHandler = function(event) { //event is a way to target something happening on the page
  event.preventDefault(); //preventDefault in this case prevents the submit event from reloading the page automatically
var taskNameInput = document.querySelector("input[name='task-name']").value; //this targets the value of the taskNameInput variable
var taskTypeInput = document.querySelector("select[name='task-type']").value;//targets the value for the option withing the select element
console.dir(taskNameInput); //console.dir is a different way of getting information than console.log
    var listItemEl = document.createElement("li"); // this creates an li element with the name listItemEl
    listItemEl.className = "task-item"; //This line targets/assigns the class task-item to the var, in this case styling the created li
var taskInfoEl = document.createElement("div");//creates a div which holds task info and item name
    taskInfoEl.className = "task-info";//defines the class name we're looking for/targeting
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    //the above line will add html to the div, in this case an h3
    listItemEl.appendChild(taskInfoEl);  //This line determines what text the created li should contain
    tasksToDoEl.appendChild(listItemEl); //this line makes new li a child of a different var
};
formEl.addEventListener("submit", createTaskHandler); //submit listens for a click event of a button with the type attribute of submit, or Enter being pressed on the keyboard 
var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");//This line links the var with the id #tasks-to-do
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");


var tasks = [];

var taskFormHandler = function(event) {//event is a way to target something happening on the page
  event.preventDefault();//preventDefault in this case prevents the submit event from reloading the page automatically
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty (validate)
  if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;//this if will prevent a submition from occuring if either of the two fields are empty, and alert them
  }

  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  // check if task is new or one being edited by seeing if it has a data-task-id attribute
  var isEdit = formEl.hasAttribute("data-task-id");
  // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } 
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObj = { //package the data as an object
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do"
    };

    createTaskEl(taskDataObj);//this sends the data as an argument to createTaskEl
  }
};

var createTaskEl = function(taskDataObj) {
  var listItemEl = document.createElement("li");// this creates an li element with the name listItemEl
  listItemEl.className = "task-item";//This line targets/assigns the class task-item to the var, in this case styling the created li
  listItemEl.setAttribute("data-task-id", taskIdCounter);//creates an id for each created task, which will incriment by 1 each task

  var taskInfoEl = document.createElement("div");//creates a div which holds task info and item name
  taskInfoEl.className = "task-info";//defines the class name we're looking for/targeting
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  //the above line will add html to the div, in this case an h3
  listItemEl.appendChild(taskInfoEl);//This line determines what text the created li should contain
  taskDataObj.id = taskIdCounter;

  tasks.push(taskDataObj);
  saveTasks();
  // create task actions (buttons and select) for task
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl); //argument how to create buttons that match a task id
  tasksToDoEl.appendChild(listItemEl);//this line makes new li a child of a different var

  // increase task counter for next unique id
  taskIdCounter++;
};

var createTaskActions = function(taskId) {
  // create container to hold elements
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";//creating the edit button on each task
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);
  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";//creating the delete button on each task
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);
  // add a drop-down selector
  var statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";
  actionContainerEl.appendChild(statusSelectEl);
  // create status options
  var statusChoices = ["To Do", "In Progress", "Completed"];//this is the array of the drop-down selector

  for (var i = 0; i < statusChoices.length; i++) {//var i = 0 initally defines counter, iterator, variable. i<statusChoices.length checks iterator against number of items in array.
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];//statusChoices[i] returns value of array at given index

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

var completeEditTask = function(taskName, taskType, taskId) {
  // find task list item with taskId value
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) { //parseInt converts a string into a number
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  };
  saveTasks();
  alert("Task Updated!");

  // remove data attribute from form
  formEl.removeAttribute("data-task-id");
  // update formEl button to go back to saying "Add Task" instead of "Edit Task"
  formEl.querySelector("#save-task").textContent = "Add Task";
};

var taskButtonHandler = function(event) {
  // get target element from event
  var targetEl = event.target;

  //edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    console.log("edit", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  //delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    console.log("delete", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var taskStatusChangeHandler = function(event) {
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  }
   else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  }
   else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  saveTasks();
};

var editTask = function(taskId) {
  console.log(taskId);

  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  // write values of taskname and taskType to form to be edited
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  // set data attribute to the form with a value of the task's id so it knows which one is being edited
  formEl.setAttribute("data-task-id", taskId);
  // update form's button to reflect editing a task rather than creating a new one
  formEl.querySelector("#save-task").textContent = "Save Task";
};

var deleteTask = function(taskId) {
  console.log(taskId);
  // find task list element with taskId value and remove it
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
  var updatedTaskArr = [];// create new array to hold updated list of tasks

  // loop through current tasks
  for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  // reassign tasks array to be the same as updatedTaskArr
  tasks = updatedTaskArr;
  saveTasks();
};

//submit listens for a click event of a button with the type attribute of submit, or Enter being pressed on the keyboard 
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));//stringify converts an array into a number
}
var loadTasks = function() {
  var savedTasks = localStorage.getItem("tasks");
  // if there are no tasks, set tasks to an empty array and return out of the function
  if (!savedTasks) {
    return false;
  }
  console.log("Saved tasks found!");
  // else, load up saved tasks

  // parse into array of objects
  savedTasks = JSON.parse(savedTasks);//parse converts a number back into an array

  // loop through savedTasks array
  for (var i = 0; i < savedTasks.length; i++) {
    // pass each task object into the `createTaskEl()` function
    createTaskEl(savedTasks[i]);
    console.log(tasks[i]);
  }
};
// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();

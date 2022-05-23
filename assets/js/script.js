var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do"); //This line links the var with the id #tasks-to-do
var taskIdCounter = 0;
var taskFormHandler = function(event) { //event is a way to target something happening on the page
    event.preventDefault(); //preventDefault in this case prevents the submit event from reloading the page automatically
var taskNameInput = document.querySelector("input[name='task-name']").value; //this targets the value of the taskNameInput variable
var taskTypeInput = document.querySelector("select[name='task-type']").value;//targets the value for the option withing the select element
if(!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;//this if will prevent a submition from occuring if either of the two fields are empty, and alert them
}
formEl.reset();
var taskDataObj = {
    name: taskNameInput,//lines 8-11 package the data as an object
    type: taskTypeInput
};
createTaskEl(taskDataObj);//this sends the data as an argument to createTaskEl
console.dir(taskNameInput); //console.dir is a different way of getting information than console.log
    
};
var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li"); // this creates an li element with the name listItemEl
    listItemEl.className = "task-item"; //This line targets/assigns the class task-item to the var, in this case styling the created li
    listItemEl.setAttribute("data-task-id", taskIdCounter);//creates an id for each created task, which will incriment by 1 each task
    var taskInfoEl = document.createElement("div");//creates a div which holds task info and item name
    taskInfoEl.className = "task-info";//defines the class name we're looking for/targeting
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    //the above line will add html to the div, in this case an h3
    listItemEl.appendChild(taskInfoEl);  //This line determines what text the created li should contain
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);//lines 30-33 argument how to create buttons that match a task id

    tasksToDoEl.appendChild(listItemEl);
    tasksToDoEl.appendChild(listItemEl); //this line makes new li a child of a different var
    taskIdCounter++;
};
var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";//line 34-41 are creating the edit button on each task
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";//line 43-48 are creating the delete button on each task
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";//lines 50-60 add a drop-down selector
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    var statusChoices = ["To Do", "In Progress", "Completed"];//this is the array of the drop-down selector
    for (var i = 0; i< statusChoices.length; i++) { //var i = 0 initally defines counter, iterator, variable. i<statusChoices.length checks iterator against number of items in array.
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];//statusChoices[i] returns value of array at given index
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    }
    actionContainerEl.appendChild(statusSelectEl);
    return actionContainerEl;
};
formEl.addEventListener("submit", taskFormHandler); //submit listens for a click event of a button with the type attribute of submit, or Enter being pressed on the keyboard 
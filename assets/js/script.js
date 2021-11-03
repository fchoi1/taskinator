var formEl = document.querySelector("#task-form"); // Form Element 
var tasksToDoEl = document.querySelector("#tasks-to-do"); // List element
var pageContentEl = document.querySelector("#page-content"); // Main Body element
var tasksInProgressEl = document.querySelector("#tasks-in-progress"); // Task in section in progress
var tasksCompletedEl = document.querySelector("#tasks-completed"); // Task in section in progress


var taskIdCounter = 0;

// For submit events on form element
var taskFormHandler = function(event){
    event.preventDefault(); // Stops the page from reloading when submit

    // Looks for input with name = task-name/task-type (attribute name), and grab the value
    var taskNameInput = document.querySelector("input[name='task-name']").value; 
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    // Validate data
    if (!taskNameInput || !taskTypeInput){ //Falsy Values
        alert("You need to fill out the task form!")
        return false; // end function if empty inputs
    }
    // Reset FOrm values
    formEl.reset();
    // reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    // Check if new or existing task
    var isEdit = formEl.hasAttribute("data-task-id");

    //Increase ID count
    if (isEdit){
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }else{
        //Package data for create Task Function
        var taskDataObj = {
            name: taskNameInput ,
            type: taskTypeInput,
        };
        // Call to create Task Element
        createTaskEl(taskDataObj);
    }
}

// For change event on main page element
var taskStatusChangeHandler = function(event){

    var taskId = event.target.getAttribute("data-task-id"); // Get item id
    var statusValue = event.target.value.toLowerCase(); //get value of selected (lowercase)

    // Find task item element from task id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // Append item element to correct workflow (append child moves it instead of creating a new one)
    if (statusValue === "to do"){ 

        tasksToDoEl.appendChild(taskSelected);

    }else if (statusValue === "in progress"){

        tasksInProgressEl.appendChild(taskSelected);

    }else if (statusValue === "completed"){

        tasksCompletedEl.appendChild(taskSelected);

    }


}

// Function to create elements from form
var createTaskEl = function(taskDataObj){

    // Create child list item
    var listItemEl = document.createElement("li"); 
    // Class Name for child list item
    listItemEl.className = "task-item"; //Class for CSS
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // New div to hold task info and add item to list
    var taskInfoEL = document.createElement("div");
    taskInfoEL.className = "task-info";
    // Insert header(task-name) and span(task-type) within div (it accepts html and not only text)
    taskInfoEL.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // Function to create button/action elements
    var taskActionsEl = createTaskActions(taskIdCounter);

    // Add task info to list item
    listItemEl.appendChild(taskInfoEL);
    // Add action element to list item
    listItemEl.appendChild(taskActionsEl);
    // Add list item to list
    tasksToDoEl.appendChild(listItemEl); 

    // Increase task counter
    taskIdCounter++
}

var createTaskActions = function(taskId){
    // Action Container
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //Create Edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.className = "btn edit-btn";
    editButtonEl.textContent = "Edit";
    editButtonEl.setAttribute("data-task-id", taskId);

    //Create Delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.setAttribute("data-task-id", taskId);


    // Create Select/Dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("data-task-id", taskId);
    statusSelectEl.setAttribute("name", "status-change");

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (choices of statusChoices) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = choices;
        statusOptionEl.setAttribute("value", choices);
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    //Append button and dropdown
    actionContainerEl.appendChild(editButtonEl);
    actionContainerEl.appendChild(deleteButtonEl);
    actionContainerEl.appendChild(statusSelectEl);

    // Return the action container with button
    return actionContainerEl;   
}

var taskButtonHandler = function(event){

    var targetEl = event.target; // Get target event

    if (targetEl.matches(".edit-btn")){     // If Edit Button clicked
        var taskId = targetEl.getAttribute("data-task-id"); // Find which task item has been pressed
        editTask(taskId);
    }else if (targetEl.matches(".delete-btn")){     // If Delete Button clicked
        var taskId = targetEl.getAttribute("data-task-id"); // Find which task item has been pressed
        deleteTask(taskId);
    }
}

// If Edit button is pressed
var editTask = function(taskId){
    console.log("Editing task # " + taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='"+ taskId + "']");
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    // Reuse the form for edits
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // Change button to Save Task
    document.querySelector("#save-task").textContent = "Save Task";

    // Set Attribute to specific Id to add on the form
    formEl.setAttribute("data-task-id", taskId);
}

// Used for updating object data for editing tasks
var completeEditTask = function(taskName, taskType, taskId) {

    // Find task item wtih TaskID
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    // Update selected task with new name and type
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert(taskName +" Task Updated!");

    // Reset Form and button
    formEl.removeAttribute("data-task-id"); // Remove Id so it can be new
    document.querySelector("#save-task").textContent = "Add Task";
};


var deleteTask = function(taskId){
    // Selects list item to be deleted based on ID
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}


// Main Page event listener for click
pageContentEl.addEventListener("click", taskButtonHandler);

// Form Listener for Submit
formEl.addEventListener("submit", taskFormHandler);

// Main Page change listener
pageContentEl.addEventListener("change", taskStatusChangeHandler);


 
  


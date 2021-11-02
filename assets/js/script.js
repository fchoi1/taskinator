var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

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

    //Package data for create Task Function
    var taskDataObj = {
        name: taskNameInput ,
        type: taskTypeInput,
    };
    // Call to create Task Element
    createTaskEl(taskDataObj);

    // Reset default values

}

// Function to create elements from form
var createTaskEl = function(taskDataObj){

    // Create child list item
    var listItemEl = document.createElement("li"); 
    // Class Name for child list item
    listItemEl.className = "task-item"; //Class for CSS

    // New div to hold task info and add item to list
    var taskInfoEL = document.createElement("div");
    taskInfoEL.className = "task-info";
    // Insert header(task-name) and span(task-type) within div (it accepts html and not only text)
    taskInfoEL.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // Add task info to list item
    listItemEl.appendChild(taskInfoEL);
    // Add list item to list
    tasksToDoEl.appendChild(listItemEl);   
}

// Can be used as an element object, but this is a method in this case, 
formEI.addEventListener("submit", taskFormHandler);

 
  
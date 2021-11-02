var formEI = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event){

    event.preventDefault(); // Stops the page from reloading when submit

    // Looks for input with name = task-name/task-type (attribute name), and grab the value
    var taskNameInput = document.querySelector("input[name='task-name']").value; 
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Create child list item
    var listItemEl = document.createElement("li"); 
    // Class Name for child list item
    listItemEl.className = "task-item"; //Class for CSS

    // New div to hold task info and add item to list
    var taskInfoEL = document.createElement("div");
    taskInfoEL.className = "task-info";
    // Insert header(task-name) and span(task-type) within div (it accepts html and not only text)
    taskInfoEL.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    // Add task info to list item
    listItemEl.appendChild(taskInfoEL);
    // Add list item to list
    tasksToDoEl.appendChild(listItemEl);   
    
}

// Can be used as an element object, but this is a method in this case, 
formEI.addEventListener("submit", createTaskHandler);

 
  
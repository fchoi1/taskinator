var formEI = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event){

    event.preventDefault(); // Stops the page from reloading when submit

    var taskItemEL = document.createElement("li"); // Create child element
    taskItemEL.textContent = "This is a new task"; // Text to dipsplay
    taskItemEL.className = "task-item"; //Class for CSS
    taskItemEL;
    tasksToDoEl.appendChild(taskItemEL);
}

// Can be used as an element object, but this is a method in this case, 
formEI.addEventListener("submit", createTaskHandler);


  

 
  
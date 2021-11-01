var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(){
    var taskItemEL = document.createElement("li"); // Create child element
    taskItemEL.textContent = "This is a new task"; // Text to dipsplay
    taskItemEL.className = "task-item"; //Class for CSS
    taskItemEL;
    tasksToDoEl.appendChild(taskItemEL);
}

// Can be used as an element object, but this is a method in this case, 
buttonEl.addEventListener("click", createTaskHandler);
  

 
  